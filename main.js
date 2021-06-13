function changeColor() {
    var eleCollection = document.getElementsByTagName('div');
    console.log("Total divs: " + eleCollection.length);
}

const size = 3;
const grid = [ [1,2,3], [4,5,6], [7,8,0] ];

checkMove = (x, y) => {
    var currentCellIndex = getCellIndex(x, y);
    var emptyCellIndex;
    var emptyCellLocation = findEmptyCellLocation(x, y);
    if(emptyCellLocation) {
        emptyCellIndex = getCellIndex(emptyCellLocation['x'], emptyCellLocation['y']);
        swapGridCell({x, y}, emptyCellLocation);
        swapElement(currentCellIndex, emptyCellIndex);
    }
}

findEmptyCellLocation = (x, y) => {
    if (!isOutOfRange(x + 1)) {
        if (grid[x + 1][y] === 0) {
            return {x: x + 1, y: y};
        }
    }
    if (!isOutOfRange(x - 1)) {
        if (grid[x - 1][y] === 0) {
            return {x: x - 1, y: y};
        }
    }
    if (!isOutOfRange(y + 1)) {
        if (grid[x][y + 1] === 0) {
            return {x: x, y: y + 1};
        }
    }
    if (!isOutOfRange(y - 1)) {
        if (grid[x][y - 1] === 0) {
            return {x: x, y: y - 1};
        }
    }
}

isOutOfRange = (val) => {
    if(val > -1 && val < size){
        return false;
    } else {
        return true;
    }
}

getCellIndex = (x, y) => {
    return (x * size) + y;
}

swapElement = (currentCellIndex, emptyCellIndex) => {
    const itemList = document.getElementById('wrapper').children;
    const emptyCellClasses = itemList[emptyCellIndex].children[0].className;
    const currentValue = itemList[currentCellIndex].children[0].innerHTML;

    itemList[emptyCellIndex].children[0].remove();
    itemList[currentCellIndex].children[0].remove();

    const p_value = document.createElement('p');
    p_value.innerHTML = currentValue;
    itemList[emptyCellIndex].appendChild(p_value);
    
    const p_empty = document.createElement('p');
    p_empty.className = emptyCellClasses;
    itemList[currentCellIndex].appendChild(p_empty);
}

swapGridCell = (currentCellLocation, emptyCellLocation) => {
    const temp = grid[currentCellLocation['x']][currentCellLocation['y']];
    grid[currentCellLocation['x']][currentCellLocation['y']] = grid[emptyCellLocation['x']][emptyCellLocation['y']];
    grid[emptyCellLocation['x']][emptyCellLocation['y']] = temp;
}