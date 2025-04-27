from flask import Blueprint, request, jsonify
from app import db
from app.models.symptom import Symptom
from app.models.species import Species

symptom_bp = Blueprint('symptom', __name__)

# GET all symptoms
@symptom_bp.route('/', methods=['GET'])
def get_all_symptoms():
    symptoms = Symptom.query.all()
    result = [{
        "symptom_id": s.symptom_id,
        "species_id": s.species_id,
        "symptom_description": s.symptom_description,
        "severity_level": s.severity_level
    } for s in symptoms]
    return jsonify(result), 200

# GET symptom by ID
@symptom_bp.route('/<int:id>', methods=['GET'])
def get_symptom(id):
    symptom = Symptom.query.get(id)
    if not symptom:
        return jsonify({"message": "Symptom not found"}), 404

    return jsonify({
        "symptom_id": symptom.symptom_id,
        "species_id": symptom.species_id,
        "symptom_description": symptom.symptom_description,
        "severity_level": symptom.severity_level
    }), 200

# POST create new symptom
@symptom_bp.route('/', methods=['POST'])
def create_symptom():
    data = request.get_json()

    # Ensure species exists
    species = Species.query.get(data['species_id'])
    if not species:
        return jsonify({"message": "Species not found"}), 404

    new_symptom = Symptom(
        species_id=data['species_id'],
        symptom_description=data['symptom_description'],
        severity_level=data.get('severity_level', 'Moderate')
    )

    db.session.add(new_symptom)
    db.session.commit()
    return jsonify({"message": "Symptom created", "symptom_id": new_symptom.symptom_id}), 201

# PUT update symptom
@symptom_bp.route('/<int:id>', methods=['PUT'])
def update_symptom(id):
    symptom = Symptom.query.get(id)
    if not symptom:
        return jsonify({"message": "Symptom not found"}), 404

    data = request.get_json()
    symptom.symptom_description = data.get('symptom_description', symptom.symptom_description)
    symptom.severity_level = data.get('severity_level', symptom.severity_level)

    db.session.commit()
    return jsonify({"message": "Symptom updated"}), 200

# DELETE symptom
@symptom_bp.route('/<int:id>', methods=['DELETE'])
def delete_symptom(id):
    symptom = Symptom.query.get(id)
    if not symptom:
        return jsonify({"message": "Symptom not found"}), 404

    db.session.delete(symptom)
    db.session.commit()
    return jsonify({"message": "Symptom deleted"}), 200
