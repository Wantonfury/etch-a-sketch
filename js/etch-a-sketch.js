const screen = document.querySelector(".grid-container");






let  getSize = () => {
    return screen.dataset.size;
}

let clearGrids = () => {
    let grids = document.querySelectorAll('.grid-item');
    
    grids.forEach(g => {
        g.remove();
    });
}

let adjustGrids = () => {
    let size = getSize();
    
    clearGrids();
    
    for (let i = 0; i < size * size; ++i) {
        let d = document.createElement('div');
        d.classList.add('grid-item');
        screen.appendChild(d);
    }
    
    screen.style.gridTemplateColumns = "repeat(" + size + ", 1fr)";
    screen.style.gridTemplateRows = "repeat(" + size + ", 1fr)";
}

let init = () => {
    adjustGrids();
}

init();