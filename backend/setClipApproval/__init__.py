import json
import logging
import os
from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableClient
from datetime import datetime
from dotenv import load_dotenv
from azure.functions import HttpRequest, HttpResponse

load_dotenv()

ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
USERS_TABLE = "users"

def main(req: HttpRequest) -> HttpResponse:
    try:
        data = req.get_json()
        clip_id = data.get('clipId')
        approved = data.get('approved')
        user_email = data.get('userEmail')
        
        if not clip_id or approved is None or not user_email:
            return HttpResponse("Missing parameters", status_code=400)
        
        credential = AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY)
        users_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name="users",
            credential=credential
        )
        
        users = users_client.query_entities(query_filter=f"email eq '{user_email}'")
        user = next(users, None)
        
        if not user or user.get('role') not in ['admin', 'moderator']:
            return HttpResponse("Unauthorized", status_code=403)
        
        clips_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name=os.getenv("AZURE_STORAGE_TABLE_NAME"),
            credential=credential
        )
        
        entity = clips_client.get_entity(partition_key="clips", row_key=clip_id)
        entity['approved'] = approved
        entity['approvedBy'] = user_email
        entity['verdictTimestamp'] = datetime.utcnow().isoformat()
        
        clips_client.update_entity(entity, mode='replace')
        
        return HttpResponse(
            json.dumps({"success": True}),
            mimetype="application/json",
            status_code=200
        )
    except Exception as e:
        logging.error(f"Error setting approval: {e}", exc_info=True)
        return HttpResponse(str(e), status_code=500)
