from app import db

class Symptom(db.Model):
    __tablename__ = 'symptom'

    symptom_id = db.Column(db.Integer, primary_key=True)
    species_id = db.Column(db.Integer, db.ForeignKey('species.species_id'), nullable=False)
    symptom_description = db.Column(db.Text, nullable=False)
    severity_level = db.Column(db.String(50))

    species = db.relationship("Species", back_populates="symptoms")
