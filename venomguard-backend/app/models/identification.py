from app import db

class Identification(db.Model):
    __tablename__ = 'identification'

    identification_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    species_id = db.Column(db.Integer, db.ForeignKey('species.species_id'))
    image_path = db.Column(db.String(255))
    confidence_score = db.Column(db.Numeric(5,2))
    identified_at = db.Column(db.DateTime, server_default=db.func.now())
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
