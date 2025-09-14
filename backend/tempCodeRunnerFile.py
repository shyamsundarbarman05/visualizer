
    "heap": heap_sort,
}

@app.route("/sort", methods=["POST"])
def sort():
    data = request.get_json()