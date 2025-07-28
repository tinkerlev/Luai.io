from pathlib import Path

def generate_contact_thank_you_html(name: str, company: str, message: str) -> str:
    """
    Load and render the HTML thank-you email for the contact form submission.
    Replaces placeholders like {{name}}, {{company}}, {{message}}.
    """
    path = Path(__file__).resolve().parent.parent.parent / "templates" / "email.html"
    try:
        with open(path, "r", encoding="utf-8") as f:
            html = f.read()
        html = html.replace("{{name}}", name)
        html = html.replace("{{company}}", company)
        html = html.replace("{{message}}", message)
        return html
    except Exception as e:
        raise RuntimeError(f"[contact_email] Template rendering failed: {str(e)}")
