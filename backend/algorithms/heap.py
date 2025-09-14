def heapify(arr, n, i, steps):
    largest = i
    l = 2 * i + 1
    r = 2 * i + 2

    if l < n:
        steps.append((arr.copy(), [largest, l], [], list(range(n, len(arr)))))
    if l < n and arr[i] < arr[l]:
        largest = l

    if r < n:
        steps.append((arr.copy(), [largest, r], [], list(range(n, len(arr)))))
    if r < n and arr[largest] < arr[r]:
        largest = r

    if largest != i:
        steps.append((arr.copy(), [], [i, largest], list(range(n, len(arr)))))
        arr[i], arr[largest] = arr[largest], arr[i]
        steps.append((arr.copy(), [], [i, largest], list(range(n, len(arr)))))
        heapify(arr, n, largest, steps)

def heap_sort(arr):
    n = len(arr)
    steps = [(arr.copy(), [], [], [])]

    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i, steps)

    for i in range(n - 1, 0, -1):
        steps.append((arr.copy(), [], [0, i], list(range(i, n))))
        arr[0], arr[i] = arr[i], arr[0]
        steps.append((arr.copy(), [], [0, i], list(range(i, n))))
        heapify(arr, i, 0, steps)
    
    steps.append((arr.copy(), [], [], list(range(n))))
    return steps
