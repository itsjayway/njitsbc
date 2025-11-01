import base64
from io import BytesIO
from PIL import Image
import cv2
import json
import logging
import os
import requests
import uuid

from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableClient
from datetime import datetime
from dotenv import load_dotenv

import azure.functions as func

load_dotenv()

ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
TABLE_NAME = os.getenv("AZURE_STORAGE_TABLE_NAME")


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        credential = AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY)
        body = req.get_json()

        file_name = body.get("fileName")
        date = body.get("date")
        location = body.get("location")
        description = body.get("description")
        blob_url = body.get("blobUrl")
        user = body.get("user", "anonymous")
        thumbnail = body.get("thumbnail")

        if not file_name or not blob_url:
            return func.HttpResponse("Missing required fields", status_code=400)

        table_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name=TABLE_NAME,
            credential=credential,
        )

        if thumbnail is None:
            try:
                if is_video_file(blob_url):
                    thumbnail = get_nth_frame(blob_url, -1)
                else:
                    thumbnail = get_image_thumbnail(blob_url)
            except Exception as e:
                logging.error(f"Error generating thumbnail: {e}")
                thumbnail = ""

        entity = {
            "PartitionKey": "clips",
            "RowKey": str(uuid.uuid4()),
            "fileName": file_name,
            "date": date or datetime.utcnow().isoformat(),
            "location": location or "",
            "description": description or "",
            "uploadedBy": user,
            "blobUrl": blob_url,
            "approved": None,
            "thumbnail": thumbnail,
        }

        table_client.create_entity(entity=entity)

        return func.HttpResponse(
            json.dumps({"status": "ok"}), mimetype="application/json", status_code=200
        )
    except Exception as e:
        logging.error(f"Error saving metadata: {e}", exc_info=True)
        return func.HttpResponse(f"Server error: {e}", status_code=500)


def is_video_file(filename: str) -> bool:
    filename = filename.lower()
    video_extensions = [".mp4", ".mov", ".avi", ".mkv"]
    return any(filename.endswith(ext) for ext in video_extensions)


THUMBNAIL_SIZE = (400, 400)


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
    image = Image.open(BytesIO(buffer))
    image.thumbnail(THUMBNAIL_SIZE)
    buffer = BytesIO()
    image.save(buffer, format="JPEG")
    return "data:image/jpeg;base64," + base64.b64encode(buffer.getvalue()).decode(
        "utf-8"
    )


def get_image_thumbnail(image_url: str) -> str:
    resp = requests.get(image_url)
    image = Image.open(BytesIO(resp.content))
    image.thumbnail(THUMBNAIL_SIZE)
    buffer = BytesIO()
    image.save(buffer, format="JPEG")
    return "data:image/jpeg;base64," + base64.b64encode(buffer.getvalue()).decode(
        "utf-8"
    )
