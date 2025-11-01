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

        return func.HttpResponse(
            json.dumps(clips), mimetype="application/json", status_code=200
        )
    except Exception as e:
        return func.HttpResponse(json.dumps({"error": str(e)}), status_code=500)
