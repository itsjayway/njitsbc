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
        user_email = req.params.get('userEmail') or req.headers.get('X-User-Email')
        
        credential = AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY)
        
        if user_email:
            users_client = TableClient(
                endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
                table_name="users",
                credential=credential
            )
            
            users = list(users_client.query_entities(query_filter=f"email eq '{user_email}'"))
            
            if users:
                user_role = users[0].get('role', 'viewer')
                if user_role not in ['admin', 'moderator']:
                    logging.warning(f"Unauthorized access attempt by {user_email}")
                    return func.HttpResponse(
                        json.dumps({"error": "Unauthorized"}),
                        mimetype="application/json",
                        status_code=403
                    )
        
        table_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name=TABLE_NAME,
            credential=credential
        )
        
        entities = table_client.list_entities()
        
        clips = [entity for entity in entities]
        
        clips = sorted(clips, key=lambda x: x['date'], reverse=True)
        
        return func.HttpResponse(
            json.dumps(clips),
            mimetype="application/json",
            status_code=200
        )
        
    except Exception as e:
        logging.error(f"Error listing all clips: {e}", exc_info=True)
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            mimetype="application/json",
            status_code=500
        )