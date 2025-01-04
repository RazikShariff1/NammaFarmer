from flask import Flask, Blueprint, jsonify
import psycopg2
import os

# Create Flask app and Blueprint
app = Flask(__name__)
products_bp = Blueprint('listings', __name__)

# Database connection string (set this in your environment)
CONNECTION_STRING = os.getenv("DATABASE_URL")

# Function to connect to the database
def get_db_connection():
    try:
        conn = psycopg2.connect(CONNECTION_STRING)
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

# Route to fetch all products
@products_bp.route('/api/products', methods=['GET'])
def get_all_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Failed to connect to database"}), 500

    try:
        # Query to fetch all products
        query = """
        SELECT 
            id, 
            name, 
            category, 
            price, 
            quantity, 
            description, 
            status, 
            image 
        FROM products;
        """
        cursor = conn.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        conn.close()

        # Convert rows to a list of dictionaries
        products = [
            {
                "id": row[0],
                "name": row[1],
                "category": row[2],
                "price": float(row[3]),  # Ensure the price is converted to float
                "quantity": row[4],
                "description": row[5],
                "status": row[6],
                "image": row[7],
            }
            for row in rows
        ]

        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# Route to fetch a single product by ID
@products_bp.route('/api/product/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Failed to connect to database"}), 500

    try:
        # Query to fetch a single product by ID
        query = """
        SELECT 
            id, 
            name, 
            category, 
            price, 
            quantity, 
            description, 
            status, 
            image 
        FROM products
        WHERE id = %s;
        """
        cursor = conn.cursor()
        cursor.execute(query, (product_id,))
        row = cursor.fetchone()
        conn.close()

        if row is None:
            return jsonify({"error": "Product not found"}), 404

        product = {
            "id": row[0],
            "name": row[1],
            "category": row[2],
            "price": float(row[3]),  # Ensure the price is converted to float
            "quantity": row[4],
            "description": row[5],
            "status": row[6],
            "image": row[7],
        }

        return jsonify(product), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

