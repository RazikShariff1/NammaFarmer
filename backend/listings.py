from flask import Blueprint, jsonify
import psycopg2
import os

# Create a Blueprint for listings
listings_bp = Blueprint('listings', __name__)

# Database connection string
CONNECTION_STRING = os.getenv("DATABASE_URL")

# Function to connect to the database
def get_db_connection():
    try:
        conn = psycopg2.connect(CONNECTION_STRING)
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

# Route to fetch listings
@listings_bp.route('/api/listings', methods=['GET'])
def get_listings():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Failed to connect to database"}), 500

    try:
        # Query to join listings and product tables
        query = """
        SELECT 
            l.id AS listing_id,
            p.product_id,
            p.name,
            p.category,
            l.price AS listing_price,
            l.quantity AS available_quantity,
            p.image,
            p.description,
            4.5 AS rating, -- Assume rating is static for now
            l.status
        FROM listings l
        JOIN product p ON l.product_id = p.product_id
        WHERE l.status = 'active'; -- Fetch only active listings
        """
        cursor = conn.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
        conn.close()

        # Convert rows to a list of dictionaries
        listings = [
            {
                "listing_id": row[0],
                "product_id": row[1],
                "name": row[2],
                "category": row[3],
                "price": float(row[4]),
                "quantity": row[5],
                "image": row[6],
                "description": row[7],
                "rating": row[8],
                "status": row[9],
            }
            for row in rows
        ]
        return jsonify(listings), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

# Route to fetch a single product's details by product_id
@listings_bp.route('/api/product/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Failed to connect to database"}), 500

    try:
        # Query to join listings and product tables
        query = """
        SELECT 
            l.id AS listing_id,
            p.product_id,
            p.name,
            p.category,
            l.price AS listing_price,
            l.quantity AS available_quantity,
            p.image,
            p.description,
            4.5 AS rating, -- Assume rating is static for now
            l.status
        FROM listings l
        JOIN product p ON l.product_id = p.product_id
        WHERE l.product_id = %s AND l.status = 'active';  -- Fetch only active listings
        """
        cursor = conn.cursor()
        cursor.execute(query, (product_id,))
        row = cursor.fetchone()
        conn.close()

        if row is None:
            return jsonify({"error": "Product not found in listings"}), 404

        product = {
            "listing_id": row[0],
            "product_id": row[1],
            "name": row[2],
            "category": row[3],
            "price": float(row[4]),
            "quantity": row[5],
            "image": row[6],
            "description": row[7],
            "rating": row[8],
            "status": row[9],
        }

        return jsonify(product), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()