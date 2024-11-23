# users.py
from flask import Blueprint, jsonify, request
import psycopg2
from psycopg2.extras import RealDictCursor

# Connection string for PostgreSQL
CONNECTION_STRING = (
    "user=postgres.myjpgltrdmjczavamwan "
    "password=nammaFarmer_123 "
    "host=aws-0-ap-southeast-1.pooler.supabase.com "
    "port=6543 "
    "dbname=postgres"
)

# Helper function to connect to the database
def get_db_connection():
    try:
        conn = psycopg2.connect(CONNECTION_STRING)
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Define the blueprint for user routes
users_bp = Blueprint('users', __name__)

# Route for user signup
@users_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')  # Ensure password is hashed in production!

    if not name or not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        with conn.cursor() as cur:
            # Check if the user already exists
            cur.execute("SELECT * FROM users WHERE email = %s", (email,))
            existing_user = cur.fetchone()
            if existing_user:
                return jsonify({'error': 'User already exists'}), 400

            # Insert the new user
            cur.execute(
                "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
                (name, email, password),
            )
            conn.commit()

        return jsonify({'message': 'Signup successful!'}), 201

    except Exception as e:
        print(f"Error during signup: {e}")
        return jsonify({'error': 'Internal server error'}), 500

    finally:
        if conn:
            conn.close()

# Route for user login
@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')  # Ensure password verification in production!

    if not email or not password:
        return jsonify({'error': 'Missing fields'}), 400

    try:
        conn = get_db_connection()
        if not conn:
            return jsonify({'error': 'Database connection failed'}), 500

        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Verify user credentials
            cur.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
            user = cur.fetchone()

            if not user:
                return jsonify({'error': 'Invalid credentials'}), 401

            return jsonify({'message': 'Login successful!', 'user': user}), 200

    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({'error': 'Internal server error'}), 500

    finally:
        if conn:
            conn.close()
