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

# Vercel exposes the app via a variable named 'api'
api = app

if __name__ == "__main__":
    # This part is for local development, Vercel will not run this.
    # The route is changed to match the production route for consistency.
    @app.route("/sort", methods=["POST"])
    def local_sort():
        return sort()
        
    app.run(debug=True, port=5000)
