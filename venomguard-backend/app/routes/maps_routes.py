import os
import requests
from flask import Blueprint, request, jsonify

maps_bp = Blueprint('maps', __name__, url_prefix='/api')

@maps_bp.route('/nearby-hospitals', methods=['GET'])
def get_nearby_hospitals():
    latitude = request.args.get("lat")
    longitude = request.args.get("lng")

    if not latitude or not longitude:
        return jsonify({"error": "Missing latitude or longitude"}), 400

    api_key = os.environ.get("GOOGLE_MAPS_API_KEY")
    if not api_key:
        return jsonify({"error": "API key not set"}), 500

    url = (
        f"https://maps.googleapis.com/maps/api/place/nearbysearch/json"
        f"?location={latitude},{longitude}"
        f"&radius=5000"
        f"&type=hospital"
        f"&key={api_key}"
    )

    try:
        response = requests.get(url)
        data = response.json()
        hospitals = []

        for result in data.get("results", []):
            hospitals.append({
                "name": result.get("name"),
                "address": result.get("vicinity"),
                "location": result.get("geometry", {}).get("location", {}),
                "rating": result.get("rating"),
            })

        return jsonify({"results": hospitals})
    
    except Exception as e:
        print(f"❌ Failed to fetch hospitals: {e}")
        return jsonify({"error": "Failed to fetch hospitals"}), 500
