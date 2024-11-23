# app.py
from flask import Flask, jsonify
from flask_cors import CORS
from users import users_bp  # Import the user blueprint
from weather import weather_bp  # Import the weather blueprint

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Register the blueprints
app.register_blueprint(users_bp, url_prefix='/users')  # Prefix routes with '/users'
app.register_blueprint(weather_bp)  # Prefix routes with '/weather'

# Test route
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend is working fine!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
