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

    //NEW, changing the color of the neighbor
    extend(direction) {
        for (let ite in Model.allSquares) {
            var s = Model.allSquares[ite];
            let newrow = Board.selected + direction.deltar;
            let newcol = Board.selected + direction.deltac;
            
            if (s.row == newrow && s.column == newcol && s in Board.neighbors) {
                s.color.set(Board.selected.color);
            }
        }
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

    // NEW
    //given a square, you can see if it is already colored
    isColored(square) { 
        let isColored = false;
        if (square.color != 'white') {
            return isColored = true;
        }
    }

    //NEW
    neighbors(square) { 
        // push squares with columns the same as board.selected.column +- 1 and board.selected.row +- 1
        let neighbors = [null, null, null, null];
        let right = square.column + 1;
        let left = square.column - 1;
        let up = square.row + 1;
        let down = square.row - 1;
        
        for (let ite in Model.allSquares) {
            var s = Model.allSquares[ite];
            if (s in neighbors) { break; } //avoid double counting
            if (s.column = right) {
                neighbors.set(0, s);
                break;
            }
            if (s.column = left) {
                neighbors.set(1, s);
                break;
            }
            if (s.row = up) {
                neighbors.set(2, s);
                break;
            }
            if (s.row = down) { 
                neighbors.set(3, s);
                break;
            }
            else { break; } //do i need?
        }
    }

    //NEW
    availableMoves() { 
        let s = this.selected;
        if (s == null) { return []; }

        let moves = [];
        let neighbors = neighbors(s);

        //can move right? 
        let available = false;
        if (s.column > 0) {
            available = true; 
            if (neighbors[0].isColored()) { // does the isColored need param
                available = false;
            }
        }
        if (available) { 
            moves.push(Right);
        }
        
        //can move left? 
        available = false;
        if (s.column > 0) {
            available = true; 
            if (neighbors[1].isColored()) { // does the isColored need param
                available = false;
            }
        }
        if (available) { 
            moves.push(Left);
        }
        
        //can move up? 
        available = false;
        if (s.column > 0) {
            available = true; 
            if (neighbors[2].isColored()) { // does the isColored need param
                available = false;
            }
        }
        if (available) { 
            moves.push(Up);
        }

        //can move down? 
        available = false;
        if (s.column > 0) {
            available = true; 
            if (neighbors[3].isColored()) { // does the isColored need param
                available = false;
            }
        }
        if (available) { 
            moves.push(Down);
        }

        return moves;
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

    //updateMoveNum(square) { 
        //// take the move number displayed on the square where extending from and add one
   // }

    available(direction) { 
        // if no piece selected, then none are available.
        if (!this.board.selected) { return false; }
        if (direction == NoMove) { return false; }

        let allMoves = this.board.availableMoves(); //get available moves for a selected square
        return allMoves.includes(direction);
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

        return NoMove;
    }
}

export const Down = new moveDirection(1, 0);
export const Up = new moveDirection(-1, 0);
export const Left = new moveDirection(0, -1);
export const Right = new moveDirection(0, 1);
export const NoMove = new moveDirection(0, 0);  // no move is possible