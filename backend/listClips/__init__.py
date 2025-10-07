import json
import logging
import os

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
            credential=credential
        )

        entities = table_client.list_entities()
        clips = [dict(e) for e in entities]

        return func.HttpResponse(
            json.dumps(clips),
            mimetype="application/json",
            status_code=200
        )
    except Exception as e:
        logging.error(f"Error listing clips: {e}", exc_info=True)
        return func.HttpResponse(str(e), status_code=500)