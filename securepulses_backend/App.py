from flask import Flask, request, jsonify
from send_mail import send_admin_email, send_user_email

app = Flask(__name__)

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')
    company = data.get('company', '')
    send_admin_email(name, email, message, company)
    send_user_email(name, email, message, company)

    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)