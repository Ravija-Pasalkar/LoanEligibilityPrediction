from flask import Flask, request, jsonify, render_template
from confluent_kafka import Producer
import json

app = Flask(__name__)

# Kafka Producer configuration
kafka_producer = Producer({
    'bootstrap.servers': 'localhost:9092'  # Change this to your Kafka server address
})

@app.route('/')
def index():
    return render_template('application.html')  # Render index.html from the templates folder

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    print("Form submission received!", data)

    # Send data to Kafka
    try:
        kafka_producer.produce('loan_data', key=data['name'], value=json.dumps(data))
        kafka_producer.flush()
        response_message = "Application submitted successfully!"
    except Exception as e:
        response_message = f"Failed to send data to Kafka: {e}"

    return jsonify({"message": response_message})

if __name__ == '__main__':
    app.run(debug=True)
