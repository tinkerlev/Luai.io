import smtplib
from email.mime.text import MIMEText
from flask import render_template
from mail_config import *

def send_admin_email(name, email, message, company):
    subject = "New Contact Form Submission"
    body = f"Name: {name}\nEmail: {email}\nCompany: {company}\nMessage: {message}"
    msg = MIMEText(body, 'plain')
    msg['Subject'] = subject
    msg['From'] = MAIL_USERNAME
    msg['To'] = MAIL_USERNAME

    with smtplib.SMTP(MAIL_SERVER, MAIL_PORT) as server:
        if MAIL_USE_TLS:
            server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        server.sendmail(MAIL_USERNAME, [MAIL_USERNAME], msg.as_string())

def send_user_email(name, email, message, company):
    subject = "We received your request"
    html = render_template('email.html', name=name, message=message, company=company)
    msg = MIMEText(html, 'html')
    msg['Subject'] = subject
    msg['From'] = MAIL_USERNAME
    msg['To'] = email

    with smtplib.SMTP(MAIL_SERVER, MAIL_PORT) as server:
        if MAIL_USE_TLS:
            server.starttls()
        server.login(MAIL_USERNAME, MAIL_PASSWORD)
        server.sendmail(MAIL_USERNAME, [email], msg.as_string())
