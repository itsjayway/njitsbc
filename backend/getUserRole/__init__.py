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
USERS_TABLE = "users"

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        email = req.params.get('email')
        if not email:
            return func.HttpResponse("Email required", status_code=400)
        
        credential = AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY)
        table_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name=USERS_TABLE,
            credential=credential
        )
        
        users = table_client.query_entities(
            query_filter=f"email eq '{email}'"
        )
        
        user = None
        for u in users:
            user = u
            break
        
        if user:
            role = user.get('role', 'viewer')
        else:
            role = 'viewer'
        
        return func.HttpResponse(
            json.dumps({"role": role}),
            mimetype="application/json",
            status_code=200
        )
    except Exception as e:
        logging.error(f"Error getting user role: {e}", exc_info=True)
        return func.HttpResponse(str(e), status_code=500)