import requests
from flask import Blueprint, request, jsonify
import os

hospital_bp = Blueprint('hospital', __name__, url_prefix='/api')

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")  # keep this in .env

@hospital_bp.route('/hospitals', methods=['GET'])
def get_nearby_hospitals():
    lat = request.args.get('lat')
    lng = request.args.get('lng')

    if not lat or not lng:
        return jsonify({"error": "Latitude and longitude are required"}), 400

    try:
        response = requests.get(
            "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
            params={
                "location": f"{lat},{lng}",
                "radius": 10000,  # in meters
                "type": "hospital",
                "key": GOOGLE_MAPS_API_KEY,
            }
        )
        data = response.json()

        if data.get("status") != "OK":
            return jsonify({"error": data.get("error_message", "Failed to fetch hospitals")}), 500

        hospitals = [{
            "name": place["name"],
            "address": place.get("vicinity"),
            "location": place["geometry"]["location"]
        } for place in data.get("results", [])]

        return jsonify(hospitals)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
