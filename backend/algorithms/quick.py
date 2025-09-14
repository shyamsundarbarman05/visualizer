def quick_sort_generator(arr):
    steps = []
    steps.append((arr.copy(), [], [], []))
    quick_sort_recursive(arr, 0, len(arr) - 1, steps)
    steps.append((arr.copy(), [], [], list(range(len(arr)))))
    return steps

def partition(arr, low, high, steps):
    pivot = arr[high]
    i = low - 1
    steps.append((arr.copy(), [high], [], [], low, high)) # Mark pivot

    for j in range(low, high):
        steps.append((arr.copy(), [j, high], [], [], low, high)) # Comparing
        if arr[j] < pivot:
            i += 1
            steps.append((arr.copy(), [], [i, j], [], low, high)) # Swapping
            arr[i], arr[j] = arr[j], arr[i]
            steps.append((arr.copy(), [], [i, j], [], low, high))

    steps.append((arr.copy(), [], [i + 1, high], [], low, high)) # Swap pivot
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    steps.append((arr.copy(), [], [i + 1, high], [], low, high))
    return i + 1

def quick_sort_recursive(arr, low, high, steps):
    if low < high:
        pi = partition(arr, low, high, steps)
        quick_sort_recursive(arr, low, pi - 1, steps)
        quick_sort_recursive(arr, pi + 1, high, steps)
