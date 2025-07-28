import html
import re
from utils.logger import logger

def sanitize_input(value: str, field_name: str = "input") -> str:
    if not isinstance(value, str):
        logger.warning(f"Rejected non-string input in {field_name}")
        return ""

    if field_name == "email" and not re.match(r"^[\w\.-]+@[\w\.-]+\.\w{2,}$", value):
        logger.warning(f"Rejected suspicious email: {value}")
        return ""

    value = value.strip()
    value = html.escape(value)

    injection_patterns = [
        r"<script.*?>.*?</script>",   # script tags
        r"(?:--|\|\||;)",             # SQL control chars
        r"(?i)\b(UNION|SELECT|INSERT|DELETE|UPDATE|DROP|OR|AND)\b",  # SQL keywords
        r"\b(alert|onerror|onload)\b",  # JS event handlers
    ]

    for pattern in injection_patterns:
        if re.search(pattern, value, re.IGNORECASE):
            logger.warning(f"Rejected suspicious input in {field_name}: '{value}'")
            return ""

    return value