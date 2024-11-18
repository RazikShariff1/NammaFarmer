from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace with your actual RapidAPI key
RAPIDAPI_KEY = "2e9c095107msh3fd20e175baaa52p198020jsn2adcbf334b35"
RAPIDAPI_HOST = "weather-api99.p.rapidapi.com"
API_URL = "https://weather-api99.p.rapidapi.com/weather"

@app.route('/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city', default='London', type=str)
    
    # Set up headers and query parameters for the RapidAPI request
    headers = {
        "x-rapidapi-key": RAPIDAPI_KEY,
        "x-rapidapi-host": RAPIDAPI_HOST
    }
    
    querystring = {"city": city}
    
    # Make a GET request to the weather API
    response = requests.get(API_URL, headers=headers, params=querystring)
    
    # If the API responds successfully, return the data
    if response.status_code == 200:
        print(response.json())
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to fetch weather data"}), 500

if __name__ == '__main__':
    app.run(debug=True)