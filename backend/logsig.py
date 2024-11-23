from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

# Initialize Flask App
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Database connection string
CONNECTION_STRING = (
    "user=postgres.myjpgltrdmjczavamwan "
    "password=nammaFarmer_123 "
    "host=aws-0-ap-southeast-1.pooler.supabase.com "
    "port=6543 "
    "dbname=postgres"
)


# Connect to the Supabase database
def get_db_connection():
    conn = psycopg2.connect(CONNECTION_STRING)
    return conn

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Check if the user already exists
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cur.fetchone()
        if existing_user:
            return jsonify({"error": "User already exists"}), 400

        # Insert new user
        cur.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, password),
        )
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "User created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Verify user
        cur.execute(
            "SELECT * FROM users WHERE email = %s AND password = %s", (email, password)
        )
        user = cur.fetchone()

        if not user:
            return jsonify({"error": "Invalid email or password"}), 401

        cur.close()
        conn.close()

        return jsonify({"message": "Login successful", "user": {"email": user[1], "name": user[0]}}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
