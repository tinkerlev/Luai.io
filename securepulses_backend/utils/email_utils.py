import smtplib
from email.message import EmailMessage
from email.utils import formataddr
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from dotenv import load_dotenv
import pathlib

load_dotenv()

SMTP_SERVER = "smtp.zoho.com"
SMTP_PORT = 587
SMTP_USER = os.getenv("ZOHO_SMTP_USER")
SMTP_PASS = os.getenv("ZOHO_SMTP_PASS")
NOREPLY_SMTP_USER = os.getenv("NOREPLY_SMTP_USER")
NOREPLY_SMTP_PASS = os.getenv("NOREPLY_SMTP_PASS")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", SMTP_USER)
NOREPLY_EMAIL = os.getenv("NOREPLY_EMAIL", f"no-reply@{SMTP_USER.split('@')[-1]}")
SENDER_NAME = os.getenv("SENDER_NAME", "Luai")


# =======================
# Email to Admin
# =======================
def send_admin_notification(name: str, email: str, company: str, message: str):
    subject = f"[Contact Form] New message from {name}"
    body = f"""You received a new message from the website contact form:

        Name: {name}
        Email: {email}
        Company: {company}
        Message:
        {message}
        """
    msg = EmailMessage()
    msg["From"] = formataddr((SENDER_NAME, SMTP_USER))
    msg["To"] = ADMIN_EMAIL
    msg["Subject"] = subject
    msg.set_content(body)

    _send_email(msg, SMTP_USER, SMTP_PASS)

# =======================
# Email to User
# =======================

def send_user_confirmation(name: str, user_email: str, company: str, message: str):
    subject = "Thanks for contacting Luai"
    try:
        with open("templates/email.html", "r", encoding="utf-8") as f:
            html_template = f.read()

        html_content = html_template.replace("{{name}}", name)\
                                    .replace("{{company}}", company)\
                                    .replace("{{message}}", message)

        msg = MIMEMultipart('alternative')
        msg["From"] = formataddr((SENDER_NAME, NOREPLY_EMAIL))
        msg["To"] = user_email
        msg["Subject"] = subject

        # Plain text fallback + HTML content
        msg.attach(MIMEText("Thanks for your message!", 'plain'))
        msg.attach(MIMEText(html_content, 'html'))

        _send_email(msg, NOREPLY_SMTP_USER, NOREPLY_SMTP_PASS)

    except Exception as e:
        raise RuntimeError(f"Failed to send confirmation: {str(e)}")

# =======================
# Low-level SMTP Sender
# =======================
def _send_email(msg: EmailMessage, smtp_user: str, smtp_pass: str):
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.send_message(msg)
    except Exception as e:
        raise RuntimeError(f"Failed to send email: {str(e)}")
