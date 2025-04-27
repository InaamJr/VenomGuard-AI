import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import os

# Load model
model = tf.keras.models.load_model("venom_model.h5")

# Load class labels once
with open("class_labels.json", "r") as f:
    class_names = json.load(f)

# ✅ Define prediction function
def predict_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions)
    predicted_class = class_names[predicted_index]
    confidence = float(np.max(predictions)) * 100
    
    print("🐍 Predicted index:", predicted_index)
    print("✅ Class name:", class_names[predicted_index])


    return predicted_class, confidence
