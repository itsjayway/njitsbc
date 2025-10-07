import azure.functions as func
from jose import jwt, JWTError
import requests
import os

TENANT_ID = os.getenv("TENANT_ID")

if not TENANT_ID:
    raise ValueError("TENANT_ID not set in environment variables")

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}/v2.0"

def verify_token(req: func.HttpRequest):
    """
    Verify JWT token and return user info
    Returns dict with: user_id, email, name
    Raises ValueError if invalid
    """
    auth_header = req.headers.get('Authorization', '')
    
    if not auth_header.startswith('Bearer '):
        raise ValueError("No bearer token provided")
    
    token = auth_header.replace('Bearer ', '')
    
    try:
        config_response = requests.get(f"{AUTHORITY}/.well-known/openid-configuration")
        config = config_response.json()
        jwks_response = requests.get(config['jwks_uri'])
        jwks = jwks_response.json()
        
        unverified_header = jwt.get_unverified_header(token)
        
        signing_key = None
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                signing_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
                break
        
        if not signing_key:
            raise ValueError("Unable to find signing key")
        
        payload = jwt.decode(
            token,
            signing_key,
            algorithms=['RS256'],
            issuer=AUTHORITY,
            options={
                'verify_signature': True,
                'verify_aud': False,
                'verify_iss': True,
                'verify_exp': True
            }
        )
        
        return {
            'user_id': payload.get('oid') or payload.get('sub'),
            'email': payload.get('preferred_username') or payload.get('email'),
            'name': payload.get('name'),
        }
        
    except JWTError as e:
        raise ValueError(f"Invalid token: {str(e)}")
    except Exception as e:
        raise ValueError(f"Authentication failed: {str(e)}")

def try_verify_token(req: func.HttpRequest):
    """Try to verify token, return None if not authenticated"""
    try:
        return verify_token(req)
    except:
        return None