export class Square { 
    constructor(row, column, color, moveNum, base, unusable) { 
        this.row = row;
        this.column = column;
        this.color = color;
        this.moveNum = moveNum;
        this.base = base;
        this.unusable = unusable;
    }
    
    // used for solving
    copy() {
        let s = new Square(this.row, this.column, this.color, this.moveNum, this.base, this.unusable);
        return s;
    }
}

export class Board { 
    constructor(numRows, numColumns) { 
        this.numRows = numRows;
        this.numColumns = numColumns;
        this.selected = null;
    }

    initialize(squares) {
        this.squares = squares.map(s => s.copy());
    }

    select(square) {
        this.selected = square;
        //square.selected = true;
    }

    isSelected(square) {
        return square === this.selected;
    }

    clone() {
        let copy = new Board(this.numRows, this.numColumns);
        copy.squares = []; 
        for (let s of this.squares) {
            let dup = s.copy();
            copy.squares.push(dup);
            if(s === this.selected) {
                copy.selected = dup;
            }
        }
        return copy;
    }

}


export default class Model { 
    constructor(info) { 
        this.initialize(info);
        this.info = info;
    }

    initialize(info) { 
        let numRows = parseInt(info.numRows);
        let numColumns = parseInt(info.numColumns);
        
        var allSquares = [];
        for(let s of info.baseSquares) {
            allSquares.push(new Square(parseInt(s.row), parseInt(s.column), s.color, 0, true, false));
        }
        for(let s of info.unusedSquares) {
            allSquares.push(new Square(parseInt(s.row), parseInt(s.column), 'black', null, false, true));
        }
        
        //white squares
        var rowIterator = 0
        while(rowIterator < numRows){
            
            var columnIterator = 0
            while(columnIterator < numColumns) {

                var foundSquare = false;

                for(let ite in allSquares) {
                    var obj = allSquares[ite]
                    if(obj.row == rowIterator && obj.column == columnIterator) {
                        foundSquare = true;
                        break;
                    }
                }
                if (foundSquare == false) {
                    allSquares.push(new Square(rowIterator, columnIterator, 'white', null, false, false));
                }
                columnIterator = columnIterator + 1;
            }
            rowIterator = rowIterator + 1;
        }
        
   
        this.board = new Board(numRows, numColumns);
        this.board.initialize(allSquares);
        this.victory = false;

        this.showlabels = false;
    }

    copy() {
        let m = new Model(this.info);
        m.board = this.board.clone();
        m.numMoves = this.numMoves;
        m.showLabels = this.showLabels;
        m.victory = this.victory;
        return m;
    }

}

export class moveDirection { 
    constructor(deltar, deltac) { 
        this.deltar = deltar;
        this.deltac = deltac;
    }
    
    static parse(s) {
        if ((s === "down")  || (s === "Down"))   { return Down; }
        if ((s === "up")    || (s === "Up"))     { return Up; }
        if ((s === "left")  || (s === "Left"))   { return Left; }
        if ((s === "right") || (s === "Right"))  { return Right; }
    }
}

export const Down = new moveDirection(1, 0);
export const Up = new moveDirection(-1, 0);
export const Left = new moveDirection(0, -1);
export const Right = new moveDirection(0, 1);