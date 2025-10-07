import json
import logging
import os
from dotenv import load_dotenv
from azure.functions import HttpRequest, HttpResponse
from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableClient

load_dotenv()

ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
USERS_TABLE = "users"

def main(req: HttpRequest) -> HttpResponse:
    try:
        data = req.get_json()
        target_email = data.get('targetEmail')
        new_role = data.get('role')
        admin_email = data.get('adminEmail')
        
        if not target_email or not new_role or not admin_email:
            return HttpResponse("Missing parameters", status_code=400)
        
        if new_role not in ['viewer', 'moderator', 'admin']:
            return HttpResponse("Invalid role", status_code=400)
        
        credential = AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY)
        table_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name="users",
            credential=credential
        )
        
        # Verify admin permissions
        admins = table_client.query_entities(query_filter=f"email eq '{admin_email}'")
        admin = next(admins, None)
        
        if not admin or admin.get('role') != 'admin':
            return HttpResponse("Unauthorized", status_code=403)
        
        # Update or create user
        entity = {
            'PartitionKey': 'users',
            'RowKey': target_email,
            'email': target_email,
            'role': new_role
        }
        
        table_client.upsert_entity(entity)
        
        return HttpResponse(
            json.dumps({"success": True}),
            mimetype="application/json",
            status_code=200
        )
    except Exception as e:
        logging.error(f"Error setting user role: {e}", exc_info=True)
        return HttpResponse(str(e), status_code=500)