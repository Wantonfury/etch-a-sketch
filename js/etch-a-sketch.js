const screen = document.querySelector(".grid-container");

let paintColor = [0, 0, 0];

let mouseEnter = e => {
    console.log(e.buttons);
    if (e.buttons == 1) e.target.style.backgroundColor = "rgb(" + paintColor + ")";
}

let  getSize = () => {
    return screen.dataset.size;
}

let clearGrid = () => {
    let grids = document.querySelectorAll('.grid-item');
    
    grids.forEach(g => {
        g.removeEventListener('mousedown', changeMouseDown);
        g.remove();
    });
}

let adjustGrid = () => {
    let size = getSize();
    
    clearGrid();
    
    for (let i = 0; i < size * size; ++i) {
        let d = document.createElement('div');
        d.classList.add('grid-item');
        d.addEventListener('mouseenter', mouseEnter);
        d.addEventListener('mousedown', mouseEnter);
        screen.appendChild(d);
    }
    
    screen.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    screen.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
}

let init = () => {
    adjustGrid();
}

init();