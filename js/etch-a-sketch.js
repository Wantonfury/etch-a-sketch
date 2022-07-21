const screen = document.querySelector(".grid-container");
const gridSlider = document.querySelector("#grid-size");
const gridSize = document.querySelector('.slide-container span');
const btnRGB = document.querySelector('#btn-rgb');
const btnFade = document.querySelector('#btn-fade');

const BORDER_LINE = "1px solid black";
const BORDER_NONE = "";

let paintColor = "#000000";
let paintColorFade;
let border = false;
let paintRainbow = false;
let paintFade = false;

let paintGrid = e => {
    if (e.buttons == 1) {
        if (!paintRainbow && !paintFade) e.target.style.backgroundColor = paintColor;
        else if (paintRainbow) e.target.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        else if (paintFade) {
            paintColorFade = fadeColor(paintColorFade, -5);
            e.target.style.backgroundColor = paintColorFade;
        }
    }
    if (e.buttons == 0) paintColorFade = paintColor;
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

function fadeColor(color, percent) {

    var R = parseInt(color.substring(1,3), 16);
    var G = parseInt(color.substring(3,5), 16);
    var B = parseInt(color.substring(5,7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255) ? R : 255;  
    G = (G<255) ? G : 255;  
    B = (B<255) ? B : 255;  

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

let colorChange = e => {
    paintColor = e.target.value;
}

let colorRGB = e => {
    if (paintFade) return;
    paintRainbow = !paintRainbow;
    
    if (paintRainbow) btnRGB.classList.add('active');
    else btnRGB.classList.remove('active');
}

let colorFade = e => {
    if (paintRainbow) return;
    paintFade = !paintFade;
    
    if (paintFade) btnFade.classList.add('active');
    else btnFade.classList.remove('active');
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
    btnFade.addEventListener('click', colorFade);
    document.querySelector('#btn-clear').addEventListener('click', clearGrid);
    document.querySelector('#btn-toggle').addEventListener('click', toggleLines);
    
    gridSlider.addEventListener('change', adjustGrid);
    
    adjustGrid();
}

init();