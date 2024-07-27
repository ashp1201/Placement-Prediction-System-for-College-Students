from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Enable CORS for all origins

# Load your trained model
loaded_model = joblib.load("studentplacement_model.pkl")

# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    # Extract features from the request data
    tenth_marks = data['tenth_marks']
    twelth_marks = data['twelth_marks']
    cgpa = data['cgpa']
    internships = data['internships']
    backlog = data['backlog']
    innovative_project = data['innovative_project']
    communication_level = data['communication_level']

    # Check if CGPA is less than 6.5 and no project done
    if cgpa < 6 and innovative_project == 0:
        result = 'Student Not placed'
    else:
        # Make predictions
        custom_input = [[tenth_marks, twelth_marks, cgpa, internships, backlog, innovative_project, communication_level]]
        prediction = loaded_model.predict(custom_input)[0]

        # Return the prediction
        if prediction == 0:
            result = 'Student Not placed'
        else:
            result = 'Student got Placed'

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
