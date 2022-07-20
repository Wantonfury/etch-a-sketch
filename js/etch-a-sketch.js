const screen = document.querySelector(".grid-container");
const gridSlider = document.querySelector("#grid-size");
const gridSize = document.querySelector('.slide-container span');

let paintColor = [0, 0, 0];

let paintGrid = e => {
    console.log(e.buttons);
    if (e.buttons == 1) e.target.style.backgroundColor = "rgb(" + paintColor + ")";
}

let  getSize = () => {
    return gridSlider.value;
}

let deleteGrid = () => {
    let grids = document.querySelectorAll('.grid-item');
    
    grids.forEach(g => {
        g.removeEventListener('mousedown', paintGrid);
        g.removeEventListener('mouseenter', paintGrid);
        g.remove();
    });
}

let adjustGrid = () => {
    let size = getSize();
    
    deleteGrid();
    
    for (let i = 0; i < size * size; ++i) {
        let d = document.createElement('div');
        d.classList.add('grid-item');
        d.addEventListener('mousedown', paintGrid);
        d.addEventListener('mouseenter', paintGrid);
        screen.appendChild(d);
    }
    
    screen.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    screen.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
    
    gridSize.textContent = size;
}

let colorChange = e => {
    
}

let colorRGB = e => {
    
}

let clearGrid = e => {
    grid = document.querySelectorAll('.grid-item');
    
    grid.forEach(g => {
        g.style.backgroundColor = "";
    });
}

let toggleLines = e => {
    grid = document.querySelectorAll('.grid-item');
    
    grid.forEach(g => {
        if (g.style.border == "") g.style.border = "0px";
        else g.style.border = "";
    });
}

let init = () => {
    document.querySelector('#btn-color').addEventListener('click', colorChange);
    document.querySelector('#btn-rgb').addEventListener('click', colorRGB);
    document.querySelector('#btn-clear').addEventListener('click', clearGrid);
    document.querySelector('#btn-toggle').addEventListener('click', toggleLines);
    
    
    gridSlider.addEventListener('input', adjustGrid);
    
    adjustGrid();
}

init();