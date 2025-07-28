from flask import Flask, request, jsonify
from utils.email_utils import send_admin_notification, send_user_confirmation
from utils.sanitize import sanitize_input
from utils.logger import logger
import os
from dotenv import load_dotenv
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import re
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
CORS(app, origins=["http://localhost:10000", "https://luai.io", "https://luai-io.onrender.com"])
limiter = Limiter(get_remote_address, app=app, default_limits=["5 per minute"])
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1)

ALLOWED_ORIGINS = {
    "http://localhost:10000",
    "https://luai.io",
    "https://luai-io.onrender.com"
}
@app.after_request
def set_security_headers(response):
    origin = request.headers.get("Origin", "")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"

    response.headers["Content-Security-Policy"] = "default-src 'none'; connect-src 'self' https://luai.io https://luai-io.onrender.com; img-src 'self'; style-src 'self';"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response
EMAIL_REGEX = re.compile(r"^[\w\.-]+@[\w\.-]+\.\w{2,}$")

@app.route("/contact", methods=["POST", "OPTIONS"])
@limiter.limit("2 per minute")
def handle_contact():
    if request.method == "OPTIONS":
        origin = request.headers.get("Origin", "")
        response = jsonify({"ok": True})
        if origin in ALLOWED_ORIGINS:
            response.headers["Access-Control-Allow-Origin"] = origin
            response.headers["Vary"] = "Origin"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response, 200

    try:
        data = request.get_json(force=True)

        name = sanitize_input(data.get("name"), "name")
        email = sanitize_input(data.get("email"), "email")
        company = sanitize_input(data.get("company"), "company")
        message = sanitize_input(data.get("message"), "message")

        if not name or not email or not message:
            logger.warning("Missing required fields")
            return jsonify({"error": "Missing required fields"}), 400

        if not EMAIL_REGEX.match(email):
            logger.warning(f"Invalid email format: {email}")
            return jsonify({"error": "Invalid email format"}), 400

        send_admin_notification(name, email, company, message)
        send_user_confirmation(name, email, company, message)

        return jsonify({"status": "success"}), 200

    except Exception as e:
        logger.exception("Unhandled exception in /contact")
        return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=int(os.getenv("PORT", 10000)))