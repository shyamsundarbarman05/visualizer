def bubble_sort(arr):
    n = len(arr)
    yield arr.copy(), [], [], [] 
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            yield arr.copy(), [j, j + 1], [], list(range(n - i, n))
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                yield arr.copy(), [], [j, j + 1], list(range(n - i, n))
        if not swapped:
            break
    yield arr.copy(), [], [], list(range(n))
