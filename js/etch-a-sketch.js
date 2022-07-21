const screen = document.querySelector(".grid-container");
const gridSlider = document.querySelector("#grid-size");
const gridSize = document.querySelector('.slide-container span');
const btnRGB = document.querySelector('#btn-rgb');

const BORDER_LINE = "1px solid black";
const BORDER_NONE = "";

let paintColor = "#000000";
let border = true;
let paintRainbow = false;

let paintGrid = e => {
    if (e.buttons == 1) {
        if (!paintRainbow) e.target.style.backgroundColor = paintColor;
        else e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    }
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
        
        if (border) d.style.border = BORDER_LINE;
        
        screen.appendChild(d);
    }
    
    screen.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    screen.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
    
    gridSize.textContent = size;
}

let colorChange = e => {
    paintColor = e.target.value;
}

let colorRGB = e => {
    paintRainbow = !paintRainbow;
    
    if (paintRainbow) btnRGB.classList.add('active');
    else btnRGB.classList.remove('active');
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
        if (border) g.style.border = BORDER_NONE;
        else g.style.border = BORDER_LINE;
    });
    
    border = !border;
}

let init = () => {
    document.querySelector('#btn-color').addEventListener('input', colorChange);
    btnRGB.addEventListener('click', colorRGB);
    document.querySelector('#btn-clear').addEventListener('click', clearGrid);
    document.querySelector('#btn-toggle').addEventListener('click', toggleLines);
    
    gridSlider.addEventListener('change', adjustGrid);
    
    adjustGrid();
}

init();