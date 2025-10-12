import base64
from io import BytesIO
from PIL import Image
import cv2
import json
import logging
import os
import requests

from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableClient
from dotenv import load_dotenv

import azure.functions as func

load_dotenv()

ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
TABLE_NAME = os.getenv("AZURE_STORAGE_TABLE_NAME")


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        credential = AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY)

        table_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name=TABLE_NAME,
            credential=credential,
        )

        entities = table_client.list_entities(filter="approved eq true")
        clips = sorted(
            [entity for entity in entities if entity.get("approved")],
            key=lambda x: x["date"],
            reverse=True,
        )
        try:
            for clip in clips:
                blob_url = clip["blobUrl"]
                if is_video_file(blob_url):
                    clip["thumbnail"] = get_nth_frame(
                        blob_url, -1
                    )  # TODO: get frame # from metadata
                else:
                    clip["thumbnail"] = get_image_thumbnail(blob_url)
        except Exception as e:
            logging.error(f"Error generating thumbnail: {e}", exc_info=True)

        return func.HttpResponse(
            json.dumps(clips), mimetype="application/json", status_code=200
        )
    except Exception as e:
        return func.HttpResponse(json.dumps({"error": str(e)}), status_code=500)


def is_video_file(filename: str) -> bool:
    filename = filename.lower()
    video_extensions = [".mp4", ".mov", ".avi", ".mkv"]
    return any(filename.endswith(ext) for ext in video_extensions)


def get_nth_frame(video_url: str, n: int) -> str:
    cap = cv2.VideoCapture(video_url)
    if n == -1:
        p = 0.25  # percent progress in the vid
        n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) * p)
    cap.set(cv2.CAP_PROP_POS_FRAMES, n)
    ret, frame = cap.read()
    cap.release()
    if not ret:
        return ""
    _, buffer = cv2.imencode(".jpg", frame)
    return "data:image/jpeg;base64," + base64.b64encode(buffer).decode("utf-8")


def get_image_thumbnail(image_url: str) -> str:
    resp = requests.get(image_url)
    image = Image.open(BytesIO(resp.content))
    image.thumbnail((512, 512))
    buffer = BytesIO()
    image.save(buffer, format="JPEG")
    return "data:image/jpeg;base64," + base64.b64encode(buffer.getvalue()).decode(
        "utf-8"
    )
