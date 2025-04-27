from app import db

class Location(db.Model):
    __tablename__ = 'location'

    location_id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255))
    latitude = db.Column(db.Numeric(9,6))
    longitude = db.Column(db.Numeric(9,6))

    # identifications = db.relationship('Identification', backref='location', lazy=True)
