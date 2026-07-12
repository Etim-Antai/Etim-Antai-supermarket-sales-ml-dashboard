from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

# ==========================================
# Initialize Flask
# ==========================================

app = Flask(__name__)
CORS(app)

# ==========================================
# Load Model Files
# ==========================================

model = joblib.load("model.pkl")
preprocessor = joblib.load("preprocessor.pkl")
columns = joblib.load("columns.pkl")

# ==========================================
# Home Route
# ==========================================

@app.route("/")
def home():

    return jsonify({

        "message": "Supermarket Sales Prediction API",

        "status": "Running"

    })


# ==========================================
# Prediction Route
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:

        # Read JSON
        data = request.get_json()

        if data is None:

            return jsonify({

                "error": "No JSON data received."

            }), 400

        # Convert to DataFrame
        input_df = pd.DataFrame([data])

        # Check missing columns
        missing = [c for c in columns if c not in input_df.columns]

        if len(missing) > 0:

            return jsonify({

                "error": f"Missing fields: {missing}"

            }), 400

        # Reorder columns
        input_df = input_df[columns]

        # Transform
        processed = preprocessor.transform(input_df)

        # Predict
        prediction = model.predict(processed)[0]

        return jsonify({

            "predicted_sales": round(float(prediction), 2)

        })

    except Exception as e:

        return jsonify({

            "error": str(e)

        }), 500


# ==========================================
# Run Server
# ==========================================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )