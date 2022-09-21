import { Square } from "../model/model";


//Scaling constants for canvas
var BOXSIZE = 100;
const OFFSET = 8;

//Representing Rectangles (Squares)
export class Rectangle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color
        this.width = 100 - OFFSET;
        this.height = 100 - OFFSET;
    }
}

//Map piece into rectangle in puzzle view
export function computeSquare(square) {
    return new Rectangle(BOXSIZE*square.column + OFFSET, BOXSIZE*square.row + OFFSET, square.color);
}

//Draw board
export function drawBoard (ctx, model, showLabels) {
    ctx.shaddowColor = 'black';
    //BasicStroke bs = new BasicStroke(5, BasicStroke.CAP_BUTT, BasicStroke.JOIN_BEVEL, 10, fa, 10);
    //g2d.setStroke(bs);

    let selected = model.board.selected;

    model.squares.forEach(square => {
        let rect = computeSquare(square);

        if (square === selected) {
            ctx.fillStyle = 'yellow';}
        else {
            ctx.fillStyle = square.color;
        }

    ctx.shadowBlur = 10;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    })
}


//Redraw entire canvas from model
export function redrawCanvas(model, canvasObj, appObj) {
    //here for testing purposes...
    if(typeof canvasObj === "undefined") { return; }
    
    const ctx = canvasObj.getContext('2d');
    if(ctx === null) { return; }

    //clear canvas area before rendering the coordinates held in state
    ctx.clearRect(0,0, canvasObj.width, canvasObj.height);

    if(model) {
        drawBoard (ctx, model, model.showLabels);
    }
}