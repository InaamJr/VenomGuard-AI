import os
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from predict import predict_image
from app import db
from app.models.identification import Identification
from app.models.user import User
from app.models.species import Species
from app.models.location import Location

ai_bp = Blueprint('ai', __name__, url_prefix='/api')

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@ai_bp.route('/identify', methods=['POST'])
def identify_species():
    image_file = request.files.get("image")
    user_id = request.form.get("user_id")
    
    latitude = request.form.get("latitude")
    longitude = request.form.get("longitude")

    if not image_file or not user_id or not latitude or not longitude:
        return jsonify({"message": "Image, user_id, latitude, and longitude are required."}), 400
    

    filename = secure_filename(image_file.filename)
    path = os.path.join(UPLOAD_FOLDER, filename)
    image_file.save(path)

    # Predict
    predicted_class, confidence = predict_image(path)

    # Lookup species by name
    species = Species.query.filter_by(class_id=int(predicted_class)).first()
    
    print(f"🔍 Looking up species for class_id: {predicted_class}")
    print(f"✅ Matched species: {species.name if species else 'Not Found'}")

    if not species:
        return jsonify({"message": f"Predicted species '{predicted_class}' not found in DB."}), 404
    
    # 🔄 Fetch symptoms and actions for the species
    symptoms = [s.symptom_description for s in species.symptoms]
    actions = [a.action_description for a in species.actions]

    # Save to identification table
    new_ident = Identification(
        user_id=user_id,
        species_id=species.species_id,
        image_path=path,
        confidence_score=confidence,
        latitude=latitude,
        longitude=longitude
    )

    db.session.add(new_ident)
    db.session.commit()

    return jsonify({
        "species_name": species.name if species else "Not Found",
        "confidence": confidence,
        "venomous": species.venomous,
        "venom_potency": species.venom_potency,
        "genus": species.genus,
        "family": species.family,
        "sub_family": species.sub_family if species.sub_family and species.sub_family.lower() != "unknown" else None,
        "country": species.country if species.country and species.country.lower() != "unknown" else None,
        "continent": species.continent if species.continent and species.continent.lower() != "unknown" else None,
        "class_id": species.class_id,
        "symptoms": symptoms,
        "actions": actions,
        "latitude": new_ident.latitude,
        "longitude": new_ident.longitude,
    })
    
