from flask import Flask, request, jsonify
from flask_cors import CORS
from chat import get_response, predict_class, intents  # your existing logic

app = Flask(__name__)
CORS(app)  # allow frontend requests

@app.route('/chat', methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    if not user_message:
        return jsonify({"answer": "Please type a message."})
    
    # Use your chatbot logic
    predicted_intent = predict_class(user_message)
    bot_response = get_response(predicted_intent, intents)
    
    return jsonify({"answer": bot_response})

if __name__ == '__main__':
    app.run(debug=True)
