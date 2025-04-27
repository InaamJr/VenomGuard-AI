import json
import pandas as pd
from app import create_app, db
from app.models.species import Species

# Initialize Flask app context
app = create_app()
app.app_context().push()

# === Step 1: Load class labels (used for training) ===
with open("class_labels.json", "r") as f:
    class_labels = json.load(f)

# === Step 2: Load additional species data from test.csv ===
df = pd.read_csv("snake_dataset/Csv/test.csv")

# Group by class_id to avoid duplicates
grouped_species = df.groupby("class_id").first().reset_index()

# Clear existing species (Optional: only if you're reseeding from scratch)
Species.query.delete()

# === Step 3: Seed DB ===
inserted = 0
for label in class_labels:
    # Find row matching the class_id
    match = grouped_species[grouped_species["class_id"] == int(label)]

    if not match.empty:
        row = match.iloc[0]
        species = Species(
            class_id=int(row["class_id"]),
            name=row["binomial"],
            genus=row["genus"],
            family=row["family"],
            sub_family=row["snake_sub_family"],
            country=row["country"],
            continent=row["continent"],
            venomous=bool(row["poisonous"]),
            venom_potency="Unknown",  # Can enhance later
        )
    else:
        # Fallback if not found in test.csv
        species = Species(
            class_id=int(label),
            name=label,
            genus=None,
            family=None,
            sub_family=None,
            country=None,
            continent=None,
            venomous=False,
            venom_potency="Unknown",
        )
    
    db.session.add(species)
    inserted += 1

db.session.commit()
print(f"✅ Successfully seeded {inserted} species into the database.")
