from flask import Blueprint, request, jsonify
from app import db
from app.models.location import Location

location_bp = Blueprint('location', __name__)

# GET all locations
@location_bp.route('/', methods=['GET'])
def get_all_locations():
    locations = Location.query.all()
    result = [{
        "location_id": loc.location_id,
        "description": loc.description,
        "latitude": float(loc.latitude),
        "longitude": float(loc.longitude)
    } for loc in locations]
    return jsonify(result), 200

# GET one location by ID
@location_bp.route('/<int:id>', methods=['GET'])
def get_location(id):
    loc = Location.query.get(id)
    if not loc:
        return jsonify({"message": "Location not found"}), 404

    return jsonify({
        "location_id": loc.location_id,
        "description": loc.description,
        "latitude": float(loc.latitude),
        "longitude": float(loc.longitude)
    }), 200

# POST create location
@location_bp.route('/', methods=['POST'])
def create_location():
    data = request.get_json()

    new_loc = Location(
        description=data.get('description'),
        latitude=data['latitude'],
        longitude=data['longitude']
    )

    db.session.add(new_loc)
    db.session.commit()

    return jsonify({"message": "Location created", "location_id": new_loc.location_id}), 201

# PUT update location
@location_bp.route('/<int:id>', methods=['PUT'])
def update_location(id):
    loc = Location.query.get(id)
    if not loc:
        return jsonify({"message": "Location not found"}), 404

    data = request.get_json()
    loc.description = data.get('description', loc.description)
    loc.latitude = data.get('latitude', loc.latitude)
    loc.longitude = data.get('longitude', loc.longitude)

    db.session.commit()
    return jsonify({"message": "Location updated"}), 200

# DELETE location
@location_bp.route('/<int:id>', methods=['DELETE'])
def delete_location(id):
    loc = Location.query.get(id)
    if not loc:
        return jsonify({"message": "Location not found"}), 404

    db.session.delete(loc)
    db.session.commit()
    return jsonify({"message": "Location deleted"}), 200
