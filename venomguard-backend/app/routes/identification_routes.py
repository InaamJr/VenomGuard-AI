from flask import Blueprint, request, jsonify
from app import db
from app.models.identification import Identification
from app.models.user import User
from app.models.species import Species
from app.models.location import Location

ident_bp = Blueprint('identification', __name__)

# GET all identifications
@ident_bp.route('/', methods=['GET'])
def get_all_identifications():
    identifications = Identification.query.all()
    result = [{
        "identification_id": i.identification_id,
        "user_id": i.user_id,
        "species_id": i.species_id,
        "location_id": i.location_id,
        "image_path": i.image_path,
        "confidence_score": float(i.confidence_score),
        "identified_at": i.identified_at.strftime("%Y-%m-%d %H:%M:%S")
    } for i in identifications]
    return jsonify(result), 200

# GET one identification
@ident_bp.route('/<int:id>', methods=['GET'])
def get_identification(id):
    ident = Identification.query.get(id)
    if not ident:
        return jsonify({"message": "Identification not found"}), 404

    return jsonify({
        "identification_id": ident.identification_id,
        "user_id": ident.user_id,
        "species_id": ident.species_id,
        "location_id": ident.location_id,
        "image_path": ident.image_path,
        "confidence_score": float(ident.confidence_score),
        "identified_at": ident.identified_at.strftime("%Y-%m-%d %H:%M:%S")
    }), 200

# POST create new identification
@ident_bp.route('/', methods=['POST'])
def create_identification():
    data = request.get_json()

    # Validation
    user = User.query.get(data['user_id'])
    species = Species.query.get(data['species_id'])
    location = Location.query.get(data['location_id'])

    if not user:
        return jsonify({"message": "User not found"}), 404
    if not species:
        return jsonify({"message": "Species not found"}), 404
    if not location:
        return jsonify({"message": "Location not found"}), 404

    new_ident = Identification(
        user_id=data['user_id'],
        species_id=data['species_id'],
        location_id=data['location_id'],
        image_path=data['image_path'],
        confidence_score=data['confidence_score']
    )

    db.session.add(new_ident)
    db.session.commit()
    return jsonify({"message": "Identification created", "identification_id": new_ident.identification_id}), 201

# PUT update identification
@ident_bp.route('/<int:id>', methods=['PUT'])
def update_identification(id):
    ident = Identification.query.get(id)
    if not ident:
        return jsonify({"message": "Identification not found"}), 404

    data = request.get_json()
    ident.image_path = data.get('image_path', ident.image_path)
    ident.confidence_score = data.get('confidence_score', ident.confidence_score)
    ident.user_id = data.get('user_id', ident.user_id)
    ident.species_id = data.get('species_id', ident.species_id)
    ident.location_id = data.get('location_id', ident.location_id)

    db.session.commit()
    return jsonify({"message": "Identification updated"}), 200

# DELETE identification
@ident_bp.route('/<int:id>', methods=['DELETE'])
def delete_identification(id):
    ident = Identification.query.get(id)
    if not ident:
        return jsonify({"message": "Identification not found"}), 404

    db.session.delete(ident)
    db.session.commit()
    return jsonify({"message": "Identification deleted"}), 200
