from app import db

class Action(db.Model):
    __tablename__ = 'action'

    action_id = db.Column(db.Integer, primary_key=True)
    species_id = db.Column(db.Integer, db.ForeignKey('species.species_id'), nullable=False)
    action_description = db.Column(db.Text, nullable=False)
    action_type = db.Column(db.String(50))

    species = db.relationship("Species", back_populates="actions")
