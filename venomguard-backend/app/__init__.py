from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os

db = SQLAlchemy()

def create_app():
    load_dotenv()
    app = Flask(__name__, instance_relative_config=True)

    app.config.from_object('config.Config')
    app.config.from_pyfile('config.py', silent=True)

    CORS(app, origins=["http://localhost:5173"])
    
    db.init_app(app)
    

    # Register blueprints here
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')


    from app.models import user, species, symptom, action, location, identification

    from app.routes.species_routes import species_bp
    app.register_blueprint(species_bp, url_prefix='/api/species')

    from app.routes.symptom_routes import symptom_bp
    app.register_blueprint(symptom_bp, url_prefix='/api/symptom')
    
    from app.routes.action_routes import action_bp
    app.register_blueprint(action_bp, url_prefix='/api/action')

    from app.routes.location_routes import location_bp
    app.register_blueprint(location_bp, url_prefix='/api/location')

    from app.routes.identification_routes import ident_bp
    app.register_blueprint(ident_bp, url_prefix='/api/identification')
    
    from app.routes.ai_routes import ai_bp
    app.register_blueprint(ai_bp, url_prefix='/api')
    
    from app.routes.maps_routes import maps_bp
    app.register_blueprint(maps_bp)

    
    @app.route("/test")
    def test():
        return "It works!"
    
    print("📌 Registered Routes:")
    for rule in app.url_map.iter_rules():
        print(rule)



    return app
