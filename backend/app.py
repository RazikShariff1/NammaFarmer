from flask import Flask, jsonify
from flask_cors import CORS
from users import users_bp  # User blueprint
from weather import weather_bp  # Weather blueprint
from sellproduce import sellproduce_bp  # Sellproduce blueprint
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)

# Register the blueprints
app.register_blueprint(users_bp, url_prefix='/users')  # Prefix routes with '/users'
app.register_blueprint(weather_bp)  # Prefix routes with '/weather'
app.register_blueprint(sellproduce_bp, url_prefix='/sellproduce')  # Prefix routes with '/sellproduce'

# Test route
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend is working fine!'}), 200

if __name__ == '__main__':
    app.run(debug=True)
