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
        this.selected = null;
        this.squares = [];
    }
}

export default class Model { 
    constructor(info) { 
        this.initialize(info);
    }

    initialize(info) { 
        let numRows = parseInt(info.numRows);
        let numColumns = parseInt(info.numColumns);
        let squareinfo = parseInt(info.board.squares); //this is wrong, need a way to place base squares
        
        //figure out how to parse square info
        this.board = new Board(numRows, numColumns);
        this.victory = false;
    }
}

export class moveDirection { 
    constructor(deltar, deltac) { 
        this.deltar = deltar;
        this.deltac = deltac;
    }
}

export const Down = new moveDirection(1, 0, 'down');
export const Up = new moveDirection(-1, 0, 'up');
export const Left = new moveDirection(0, -1, 'left');
export const Right = new moveDirection(0, 1, 'right');