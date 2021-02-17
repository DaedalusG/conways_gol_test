const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const resolution = 15;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const COLS = Math.ceil(canvas.width / resolution);
const ROWS = Math.ceil(canvas.height / resolution);

// makes randomly populated grid
function buildGrid() {
    let grid = new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
    console.log(grid)
    return grid
}

//renders lifebox to canvas
function makeLifeBox(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution, row * resolution, resolution, resolution)
            ctx.fillStyle = cell ? 'lightgreen' : 'darkgreen';
            ctx.fill();
            ctx.stroke();
        }
    }
}

//make next interation based of rules of conways game of life

function nextGen(grid) {
    const nextGen = grid.map(arr => [...arr]);

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];
            let numNeighbours = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                        const currentNeighbour = grid[col + i][row + j]
                        numNeighbours += currentNeighbour
                    }
                }
            }
            //rules
            if (cell === 1 && numNeighbours < 2) {
                nextGen[col][row] = 0
            } else if (cell === 1 && numNeighbours > 3) {
                nextGen[col][row] = 0
            } else if (cell === 0 && numNeighbours === 3) {
                nextGen[col][row] = 1
            }
        }
    }
    return nextGen
}

//execute functions to produce and render game of life
let grid = buildGrid();
// makeLifeBox(grid)
requestAnimationFrame(update);
// setTimeout(update, 5000)

//renders grid on every generation
function update() {
    grid = nextGen(grid);
    makeLifeBox(grid);
    requestAnimationFrame(update);
}
