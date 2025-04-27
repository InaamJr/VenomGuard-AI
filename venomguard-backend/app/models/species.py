from app import db
from app.models.symptom import Symptom
from app.models.action import Action

class Species(db.Model):
    __tablename__ = 'species'

    species_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    venom_potency = db.Column(db.String(255))
    venomous = db.Column(db.Boolean)

    # Add these:
    genus = db.Column(db.String(255))
    family = db.Column(db.String(255))
    sub_family = db.Column(db.String(255))
    country = db.Column(db.String(255))
    continent = db.Column(db.String(255))
    class_id = db.Column(db.Integer)

    identifications = db.relationship('Identification', backref='species', lazy=True)
    symptoms = db.relationship("Symptom", back_populates="species", cascade="all, delete-orphan")
    actions = db.relationship("Action", back_populates="species", cascade="all, delete-orphan")