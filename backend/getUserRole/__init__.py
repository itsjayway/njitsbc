import json
import logging
import os
from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableClient
from dotenv import load_dotenv
from datetime import datetime
import azure.functions as func

load_dotenv()

ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
USERS_TABLE = "users"


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        email = req.params.get("email")
        display_name = req.params.get("displayName")
        user_id = req.params.get("localAccountId")

        if not email:
            return func.HttpResponse("Email required", status_code=400)

        credential = AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY)
        table_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name=USERS_TABLE,
            credential=credential,
        )
        users = table_client.query_entities(query_filter=f"email eq '{email}'")

        user = None
        for u in users:
            user = u
            break

        if not user:
            print("#### Registering new user")
            entity = {
                "PartitionKey": "users",
                "RowKey": user_id,
                "displayName": display_name,
                "email": email,
                "createdAt": datetime.utcnow().isoformat(),
                "role": "viewer",
            }
            print(entity)
            table_client.create_entity(entity=entity)
            user = entity
            # return func.HttpResponse(
            #     json.dumps({"status_code": 404, "message": "User not found"}),
            #     status_code=404,
            # )

        role = user.get("role")
        if not all([role, display_name, email]):
            return func.HttpResponse("User data incomplete", status_code=500)
        content = {"display_name": display_name, "role": role, "email": email}
        return func.HttpResponse(
            json.dumps(content), mimetype="application/json", status_code=200
        )
    except Exception as e:
        logging.error(f"Error getting user role: {e}", exc_info=True)
        return func.HttpResponse(json.dumps({"error": str(e)}), status_code=500)
