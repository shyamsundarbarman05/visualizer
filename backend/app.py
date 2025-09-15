from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

from algorithms.bubble import bubble_sort
from algorithms.insertion import insertion_sort
from algorithms.merge import merge_sort_generator as merge_sort
from algorithms.quick import quick_sort_generator as quick_sort
from algorithms.heap import heap_sort

# Serve the static files from the React build folder
app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
CORS(app)

ALGORITHMS = {
    "bubble": bubble_sort,
    "insertion": insertion_sort,
    "merge": merge_sort,
    "quick": quick_sort,
    "heap": heap_sort,
}

@app.route("/api/sort", methods=["POST"])
def sort():
    data = request.get_json()
    array = data.get("array")
    algorithm = data.get("algorithm")

    if not isinstance(array, list) or not algorithm:
        return jsonify({"error": "Missing or invalid array or algorithm"}), 400

    if algorithm not in ALGORITHMS:
        return jsonify({"error": "Algorithm not found"}), 400

    sort_generator = ALGORITHMS[algorithm](array.copy())
    steps = list(sort_generator)
    
    return jsonify(steps)

# Add a catch-all route to serve the React index.html file
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True)
