from flask import Blueprint, request, jsonify
from app import db
from app.models.species import Species

species_bp = Blueprint('species', __name__)

# GET all species
@species_bp.route('/', methods=['GET'])
def get_all_species():
    species_list = Species.query.all()
    result = [{
        "species_id": s.species_id,
        "name": s.name,
        "description": s.description,
        "habitat": s.habitat,
        "venom_potency": s.venom_potency,
        "venomous": s.venomous
    } for s in species_list]
    return jsonify(result), 200

# GET one species
@species_bp.route('/<int:id>', methods=['GET'])
def get_species(id):
    species = Species.query.get(id)
    if not species:
        return jsonify({"message": "Species not found"}), 404

    return jsonify({
        "species_id": species.species_id,
        "name": species.name,
        "description": species.description,
        "habitat": species.habitat,
        "venom_potency": species.venom_potency,
        "venomous": species.venomous
    }), 200

# POST create new species
@species_bp.route('/', methods=['POST'])
def create_species():
    data = request.get_json()
    new_species = Species(
        name=data['name'],
        description=data.get('description'),
        habitat=data.get('habitat'),
        venom_potency=data.get('venom_potency'),
        venomous=data.get('venomous', True)
    )
    db.session.add(new_species)
    db.session.commit()
    return jsonify({"message": "Species created", "species_id": new_species.species_id}), 201

# PUT update species
@species_bp.route('/<int:id>', methods=['PUT'])
def update_species(id):
    species = Species.query.get(id)
    if not species:
        return jsonify({"message": "Species not found"}), 404

    data = request.get_json()
    species.name = data.get('name', species.name)
    species.description = data.get('description', species.description)
    species.habitat = data.get('habitat', species.habitat)
    species.venom_potency = data.get('venom_potency', species.venom_potency)
    species.venomous = data.get('venomous', species.venomous)

    db.session.commit()
    return jsonify({"message": "Species updated"}), 200

# DELETE species
@species_bp.route('/<int:id>', methods=['DELETE'])
def delete_species(id):
    species = Species.query.get(id)
    if not species:
        return jsonify({"message": "Species not found"}), 404

    db.session.delete(species)
    db.session.commit()
    return jsonify({"message": "Species deleted"}), 200
