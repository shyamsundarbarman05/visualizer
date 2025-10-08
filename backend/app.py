from flask import Flask, request, jsonify
from flask_cors import CORS

from algorithms.bubble import bubble_sort
from algorithms.insertion import insertion_sort
from algorithms.merge import merge_sort_generator as merge_sort
from algorithms.quick import quick_sort_generator as quick_sort
from algorithms.heap import heap_sort

app = Flask(__name__)
CORS(app)

ALGORITHMS = {
    "bubble": bubble_sort,
    "insertion": insertion_sort,
    "merge": merge_sort,
    "quick": quick_sort,
    "heap": heap_sort,
}


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})

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

if __name__ == "__main__":
    app.run(use_reloader=True, port=5000, threaded=True)
