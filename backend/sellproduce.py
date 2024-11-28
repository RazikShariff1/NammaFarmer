from flask import Blueprint, jsonify, request
import psycopg2
from psycopg2.extras import RealDictCursor
import os

# Blueprint for sell produce
sellproduce_bp = Blueprint('sellproduce', __name__)

# Supabase connection string
CONNECTION_STRING = os.getenv("DATABASE_URL")

# Connect to Supabase PostgreSQL database
def get_db_connection():
    conn = psycopg2.connect(CONNECTION_STRING, cursor_factory=RealDictCursor)
    return conn

# Get all listings
@sellproduce_bp.route('/listings', methods=['GET'])
def get_listings():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM listings;")
        listings = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify(listings), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add a new listing
@sellproduce_bp.route('/listings', methods=['POST'])
def add_listing():
    data = request.json
    try:
        # Validate and set default values for optional fields
        sales = data.get('sales', 0)  # Default to 0 if not provided
        profit = data.get('profit', 0)  # Default to 0 if not provided
        image = data.get('image', None)  # Default to None if not provided

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            """
            INSERT INTO listings (name, category, price, quantity, sales, profit, description, status, image)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING *;
            """,
            (data['name'], data['category'], float(data['price']), int(data['quantity']),
             int(sales), float(profit), data['description'], data['status'], image)
        )
        new_listing = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        return jsonify(new_listing), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update a listing
@sellproduce_bp.route('/listings/<int:id>', methods=['PUT'])
def update_listing(id):
    data = request.json
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute(
            """
            UPDATE listings
            SET name=%s, category=%s, price=%s, quantity=%s, sales=%s,
                profit=%s, description=%s, status=%s, image=%s
            WHERE id=%s RETURNING *;
            """,
            (data['name'], data['category'], data['price'], data['quantity'],
             data['sales'], data['profit'], data['description'], data['status'], data['image'], id)
        )
        updated_listing = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        if updated_listing:
            return jsonify(updated_listing), 200
        else:
            return jsonify({"error": "Listing not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete a listing
@sellproduce_bp.route('/listings/<int:id>', methods=['DELETE'])
def delete_listing(id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("DELETE FROM listings WHERE id=%s RETURNING *;", (id,))
        deleted_listing = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        if deleted_listing:
            return jsonify(deleted_listing), 200
        else:
            return jsonify({"error": "Listing not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
