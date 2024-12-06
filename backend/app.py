from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from users import users_bp  # User blueprint
from weather import weather_bp  # Weather blueprint
from sellproduce import sellproduce_bp  # Sellproduce blueprint
from listings import listings_bp  # Listings blueprint
from chatgpt import chatgpt_bp  # ChatGPT blueprint
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Register the blueprints
app.register_blueprint(users_bp, url_prefix='/users')  # Prefix routes with '/users'
app.register_blueprint(weather_bp)  # Prefix routes with '/weather'
app.register_blueprint(sellproduce_bp, url_prefix='/sellproduce')  # Prefix routes with '/sellproduce'
app.register_blueprint(listings_bp, url_prefix='/listings')  # Prefix routes with '/listings'
app.register_blueprint(chatgpt_bp, url_prefix='/Farmergpt')  # Prefix routes with '/chatgpt'

# Test route
@app.route('/test', methods=['GET'])
def test():
    return jsonify({'message': 'Backend is working fine!'}), 200

if __name__ == "__main__":
    app.run(debug=True)
