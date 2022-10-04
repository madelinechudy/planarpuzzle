
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

    contains(x, y) {
        return x >= this.x && x <= (this.x + this.width) && y >= this.y && y <= (this.y + this.height);
    }
}

//Map piece into rectangle in puzzle view
export function computeSquare(square) {
    return new Rectangle(BOXSIZE*square.column + OFFSET, BOXSIZE*square.row + OFFSET, square.color);
}

//Draw board
export function drawBoard (ctx, model, showLabels) {
    ctx.shaddowColor = 'black';
    
    let selected = model.board.selected;

    model.board.squares.forEach(square => {
        let rect = computeSquare(square);
        
        if(selected == null) {
            ctx.fillStyle = square.color;
            }

        if (square === selected) {
            ctx.fillStyle = '#808080';}

        else {
            ctx.fillStyle = square.color;}

        ctx.shadowBlur = 10;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        //displaying colors and moveNums
        if (square.base) {
            if (square.color === "red") {
                ctx.font = "20px Georgia";
                ctx.strokeText(square.color, rect.x+30, 50+rect.y);
            }

            else {
                ctx.font = "20px Georgia";
                ctx.strokeText(square.color, rect.x+20, 50+rect.y);
            }
            
        }
        if (square.base === false) {
            if (square.moveNum == null) { 
                ctx.font = "20px Georgia";
                ctx.strokeText('', rect.x+40, 50+rect.y);
            }
            else {
                ctx.font = "20px Georgia";
                ctx.strokeText(square.moveNum, rect.x+40, 50+rect.y);
            } 
        }
    
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