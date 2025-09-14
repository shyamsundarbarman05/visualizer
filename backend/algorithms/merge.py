def merge_sort_generator(arr):
    steps = []
    steps.append((arr.copy(), [], [], []))
    merge_sort_recursive(arr, 0, len(arr) - 1, steps)
    steps.append((arr.copy(), [], [], list(range(len(arr)))))
    return steps

def merge_sort_recursive(arr, l, r, steps):
    if l < r:
        m = l + (r - l) // 2
        merge_sort_recursive(arr, l, m, steps)
        merge_sort_recursive(arr, m + 1, r, steps)
        merge(arr, l, m, r, steps)

def merge(arr, l, m, r, steps):
    n1 = m - l + 1
    n2 = r - m
    L = [arr[l + i] for i in range(n1)]
    R = [arr[m + 1 + i] for i in range(n2)]

    i, j, k = 0, 0, l
    
    while i < n1 and j < n2:
        steps.append((arr.copy(), [l + i, m + 1 + j], [], []))
        if L[i] <= R[j]:
            arr[k] = L[i]
            i += 1
        else:
            arr[k] = R[j]
            j += 1
        steps.append((arr.copy(), [], [k], []))
        k += 1

    while i < n1:
        arr[k] = L[i]
        steps.append((arr.copy(), [], [k], []))
        i += 1
        k += 1

    while j < n2:
        arr[k] = R[j]
        steps.append((arr.copy(), [], [k], []))
        j += 1
        k += 1
