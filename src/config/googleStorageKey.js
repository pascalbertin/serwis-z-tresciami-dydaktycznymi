require('dotenv').config();

const GOOGLE_STORAGE_KEY = {
  "type": process.env.KEY_TYPE,
  "project_id": process.env.KEY_PROJECT_ID,
  "private_key_id": process.env.KEY_PRIVATE_KEY_ID,
  "private_key": process.env.KEY_PRIVATE_KEY,
  "client_email": process.env.KEY_CLIENT_EMAIL,
  "client_id": process.env.KEY_CLIENT_ID,
  "auth_uri": process.env.KEY_AUTH_URI,
  "token_uri": process.env.KEY_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.KEY_AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.KEY_CLIENT_X509_CERT_URL
}

module.exports = GOOGLE_STORAGE_KEY;