import logging
import os

from azure.storage.blob import generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta
from dotenv import load_dotenv

import azure.functions as func

load_dotenv()

ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
CONTAINER_NAME = os.getenv("AZURE_STORAGE_CONTAINER_NAME")

def main(req: func.HttpRequest) -> func.HttpResponse:
    file_name = req.params.get('fileName')

    if not file_name:
        return func.HttpResponse("Missing fileName", status_code=400)

    try:
        sas_token = generate_blob_sas(
            account_name=ACCOUNT_NAME,
            container_name=CONTAINER_NAME,
            blob_name=file_name,
            account_key=ACCOUNT_KEY,
            permission=BlobSasPermissions(write=True, create=True),
            expiry=datetime.utcnow() + timedelta(minutes=15),
        )

        sas_url = f"https://{ACCOUNT_NAME}.blob.core.windows.net/{CONTAINER_NAME}/{file_name}?{sas_token}"

        return func.HttpResponse(
            body=f'{{"sasUrl":"{sas_url}"}}',
            status_code=200,
            mimetype="application/json"
        )
    except Exception as e:
        logging.error(e)
        return func.HttpResponse(str(e), status_code=500)
