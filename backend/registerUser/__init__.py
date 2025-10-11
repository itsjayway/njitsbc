import json
import os
from azure.core.credentials import AzureNamedKeyCredential
from azure.data.tables import TableClient
import azure.functions as func
from datetime import datetime

ACCOUNT_NAME = os.getenv("AZURE_STORAGE_ACCOUNT_NAME")
ACCOUNT_KEY = os.getenv("AZURE_STORAGE_ACCOUNT_KEY")
USERS_TABLE = "users"


def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        data = req.get_json()
        user_id = data.get("userId")
        display_name = data.get("displayName")
        email = data.get("email")

        credential = AzureNamedKeyCredential(ACCOUNT_NAME, ACCOUNT_KEY)
        table_client = TableClient(
            endpoint=f"https://{ACCOUNT_NAME}.table.core.windows.net",
            table_name=USERS_TABLE,
            credential=credential,
        )

        # check if user already exists
        try:
            table_client.get_entity(partition_key="users", row_key=user_id)
            return func.HttpResponse(
                json.dumps({"status": "exists"}),
                mimetype="application/json",
                status_code=200,
            )
        except:
            entity = {
                "PartitionKey": "users",
                "RowKey": user_id,
                "displayName": display_name,
                "email": email,
                "createdAt": datetime.utcnow().isoformat(),
                "role": "viewer"
            }

            table_client.upsert_entity(entity)

        return func.HttpResponse(
            json.dumps({"status": "ok"}),
            mimetype="application/json",
            status_code=200,
        )

    except Exception as e:
        print(f"Error saving user: {e}")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            mimetype="application/json",
            status_code=500,
        )
