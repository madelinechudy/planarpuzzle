export class Square { 
    constructor(row, column, color, moveNum, base, unusable) { 
        this.row = row;
        this.column = column;
        this.color = color;
        this.moveNum = moveNum;
        this.base = base;
        this.unusable = unusable;
    }

}

export class Board { 
    constructor(numRows, numColumns) { 
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.selected = false;
        //this.squares = [];
    }

}


export default class Model { 
    constructor(info) { 
        this.initialize(info);
    }

    initialize(info) { 
        let numRows = parseInt(info.numRows);
        let numColumns = parseInt(info.numColumns);
        let squareinfo = parseInt(info.baseSquares); //this is wrong, need a way to place base squares
        
        var allSquares = [];
        for(let s of info.baseSquares) {
            allSquares.push(new Square(parseInt(s.row), parseInt(s.column), s.color, 0, true, false));
        }

        this.board = new Board(numRows, numColumns);
        this.squares = allSquares;
        this.victory = false;

        this.showlabels = false;
    }
}

export class moveDirection { 
    constructor(deltar, deltac) { 
        this.deltar = deltar;
        this.deltac = deltac;
    }
}

export const Down = new moveDirection(1, 0);
export const Up = new moveDirection(-1, 0);
export const Left = new moveDirection(0, -1);
export const Right = new moveDirection(0, 1);