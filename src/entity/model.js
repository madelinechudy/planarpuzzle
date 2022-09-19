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
    constructor(squareinfo, numRows, numColumns) { 
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.selected = null;
        this.squares = [];
    }
}

export class Model { 
    constructor(info) { 
        initialize(info);
    }

    initialize(info) { 
        let numRows = parseInt(info.board.rows);
        let numColumns = parseInt(info.board.rows);
        let squareinfo = parseInt(info.board.squares);
        
        //figure out how to parse square info
        this.board = new Board(squareinfo, numRows, numColumns);
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