from flask import Blueprint, request, jsonify
from app import db
from app.models.action import Action
from app.models.species import Species

action_bp = Blueprint('action', __name__)

# GET all actions
@action_bp.route('/', methods=['GET'])
def get_all_actions():
    actions = Action.query.all()
    result = [{
        "action_id": a.action_id,
        "species_id": a.species_id,
        "action_description": a.action_description,
        "action_type": a.action_type
    } for a in actions]
    return jsonify(result), 200

# GET single action by ID
@action_bp.route('/<int:id>', methods=['GET'])
def get_action(id):
    action = Action.query.get(id)
    if not action:
        return jsonify({"message": "Action not found"}), 404

    return jsonify({
        "action_id": action.action_id,
        "species_id": action.species_id,
        "action_description": action.action_description,
        "action_type": action.action_type
    }), 200

# POST create action
@action_bp.route('/', methods=['POST'])
def create_action():
    data = request.get_json()

    species = Species.query.get(data['species_id'])
    if not species:
        return jsonify({"message": "Species not found"}), 404

    new_action = Action(
        species_id=data['species_id'],
        action_description=data['action_description'],
        action_type=data.get('action_type', "General")
    )

    db.session.add(new_action)
    db.session.commit()
    return jsonify({"message": "Action created", "action_id": new_action.action_id}), 201

# PUT update action
@action_bp.route('/<int:id>', methods=['PUT'])
def update_action(id):
    action = Action.query.get(id)
    if not action:
        return jsonify({"message": "Action not found"}), 404

    data = request.get_json()
    action.action_description = data.get('action_description', action.action_description)
    action.action_type = data.get('action_type', action.action_type)

    db.session.commit()
    return jsonify({"message": "Action updated"}), 200

# DELETE action
@action_bp.route('/<int:id>', methods=['DELETE'])
def delete_action(id):
    action = Action.query.get(id)
    if not action:
        return jsonify({"message": "Action not found"}), 404

    db.session.delete(action)
    db.session.commit()
    return jsonify({"message": "Action deleted"}), 200
