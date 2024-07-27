from flask import Flask, jsonify, render_template, request, redirect, session, url_for
import pickle
import numpy as np
import os
from sklearn.linear_model import LogisticRegression

# Define the path to the templates and static folder
app = Flask(__name__)

template_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'templates'))
static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'static'))

# Tell Flask where to look for templates and static files
app.template_folder = template_dir
app.static_folder = static_dir

# Load the trained model
model = pickle.load(open('/Users/xemperorx/Library/CloudStorage/GoogleDrive-xemperorxcloud@gmail.com/My Drive/De project/logistic_regression_model.pkl', 'rb'))    

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict-cancer')
def predict_cancer():
    return render_template('predict_cancer.html')

@app.route('/get-prediction', methods=['POST'])
def get_prediction():
    if request.method == 'POST':
        try:
            input_data = tuple(request.get_json())  # Get the JSON data from the request and convert it to a tuple
            print(f"Input data: {input_data}")  # Print the input data

            input_data_as_numpy_array = np.asarray(input_data)
            input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)
            print(f"input_data_as_numpy_array: {input_data_as_numpy_array}")
            print(f"input_data_reshaped: {input_data_reshaped}")
            prediction = model.predict(input_data_reshaped)
            print(f"Prediction: {prediction}")  # Print the prediction
            if (prediction[0] == 0):
                result ='The Breast cancer is Malignant'
            else:
                result = 'The Breast Cancer is Benign'
            return jsonify({'result': result}), 200
        except ValueError:
            return jsonify({'error': 'Invalid input. Please enter numeric values.'}), 400
        except Exception as e:
            print(f"Exception: {e}")  # Print the exception
            return jsonify({'error': 'An error occurred.'}), 500

if __name__ == '__main__':
    app.run(debug=True)
