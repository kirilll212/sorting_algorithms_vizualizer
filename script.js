let array = [];
const arrayContainer = document.getElementById('arrayContainer');

function generateArray() {
    arrayContainer.innerHTML = '';
    const arraySize = document.getElementById('arraySize').value;
    array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 10);
    renderArray();
}

function renderArray() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar', 'mx-1');
        bar.style.height = `${value}px`;
        bar.style.width = `${Math.floor(arrayContainer.clientWidth / array.length) - 2}px`;
        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            const bars = document.getElementsByClassName('bar');
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
                await sleep(50);
            }
        }
    }
    renderSortedArray();
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            const bars = document.getElementsByClassName('bar');
            bars[i].style.height = `${array[i]}px`;
            bars[minIndex].style.height = `${array[minIndex]}px`;
            await sleep(50);
        }
    }
    renderSortedArray();
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            const bars = document.getElementsByClassName('bar');
            bars[j + 1].style.height = `${array[j + 1]}px`;
            await sleep(50);
        }
        array[j + 1] = key;
        const bars = document.getElementsByClassName('bar');
        bars[j + 1].style.height = `${key}px`;
    }
    renderSortedArray();
}

async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const left = array.slice(start, mid + 1);
    const right = array.slice(mid + 1, end + 1);
    
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            array[k] = left[i];
            i++;
        } else {
            array[k] = right[j];
            j++;
        }
        updateBar(k, array[k]);
        await sleep(50);
        k++;
    }
    
    while (i < left.length) {
        array[k] = left[i];
        updateBar(k, array[k]);
        await sleep(50);
        i++;
        k++;
    }
    
    while (j < right.length) {
        array[k] = right[j];
        updateBar(k, array[k]);
        await sleep(50);
        j++;
        k++;
    }
}

async function quickSort(start = 0, end = array.length - 1) {
    if (start >= end) return;
    
    const pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
}

async function partition(start, end) {
    const pivot = array[end];
    let pivotIndex = start;
    
    for (let i = start; i < end; i++) {
        if (array[i] < pivot) {
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            updateBar(i, array[i]);
            updateBar(pivotIndex, array[pivotIndex]);
            pivotIndex++;
            await sleep(50);
        }
    }
    
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
    updateBar(pivotIndex, array[pivotIndex]);
    updateBar(end, array[end]);
    await sleep(50);
    
    return pivotIndex;
}

async function heapSort() {
    const n = array.length;
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        updateBar(0, array[0]);
        updateBar(i, array[i]);
        await sleep(50);
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        updateBar(i, array[i]);
        updateBar(largest, array[largest]);
        await sleep(50);
        await heapify(n, largest);
    }
}

function updateBar(index, height) {
    const bars = document.getElementsByClassName('bar');
    bars[index].style.height = `${height}px`;
}

function renderSortedArray() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].classList.add('sorted');
    }
}

function sortArray() {
    const algorithm = document.getElementById('algorithm').value;
    switch (algorithm) {
        case 'bubbleSort':
            bubbleSort();
            break;
        case 'selectionSort':
            selectionSort();
            break;
        case 'insertionSort':
            insertionSort();
            break;
        case 'mergeSort':
            mergeSort();
            break;
        case 'quickSort':
            quickSort();
            break;
        case 'heapSort':
            heapSort();
            break;
    }
}

generateArray();
