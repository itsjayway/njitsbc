import json
import logging
import os
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
        logging.info(f"Request body: {body}")

        file_name = body.get("fileName")
        date = body.get("date")
        location = body.get("location")
        description = body.get("description")
        blob_url = body.get("blobUrl")
        user = body.get("user", "anonymous")

        if not file_name or not blob_url:
            return func.HttpResponse(
                "Missing required fields",
                status_code=400
            )


        table_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name=TABLE_NAME,
            credential=credential
        )

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
        }

        table_client.create_entity(entity=entity)

        return func.HttpResponse(
            json.dumps({"status": "ok"}),
            mimetype="application/json",
            status_code=200
        )
    except Exception as e:
        logging.error(f"Error saving metadata: {e}", exc_info=True)
        return func.HttpResponse(
            f"Server error: {e}",
            status_code=500
        )
