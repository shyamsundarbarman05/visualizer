def insertion_sort(arr):
    yield arr.copy(), [], [], []
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        yield arr.copy(), [i], list(range(i)), []
        while j >= 0 and key < arr[j]:
            yield arr.copy(), [j, i], list(range(i)), []
            arr[j + 1] = arr[j]
            yield arr.copy(), [], [j + 1], list(range(i))
            j -= 1
        arr[j + 1] = key
        yield arr.copy(), [], [j + 1], list(range(i + 1))
    yield arr.copy(), [], [], list(range(len(arr)))
