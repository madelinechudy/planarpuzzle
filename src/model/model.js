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

    setColor(color) {
        this.color = color;
    }

    //used for finding end of planar path
    //getMoveNum(square) { 
    //    let moveNum = square.moveNum;
    //    return moveNum;
    //}

    setmoveNum(number) {
        this.moveNum = number;
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
    }

    isSelected(square) {
        return square === this.selected;
    }

    //given a square, you can see if it is already colored
    isColored(square) { 
        let isColored = false;
        if (square.color != 'white') {
            isColored = true;
        }
        return isColored;
    }

    neighbors(square) { 
        // push squares with columns the same as board.selected.column +- 1 and board.selected.row +- 1
        let neighbors = [null, null, null, null];
        let right = square.column + 1;
        let left = square.column - 1;
        let up = square.row - 1;
        let down = square.row + 1;
        
        for (let ite in this.squares) {
            var s = this.squares[ite];
            if (s in neighbors) { continue; } //avoid double counting
            if (s.column == right && s.row == square.row) { //right neighbor
                neighbors[0] = s;
                continue;
            }
            if (s.column == left && s.row == square.row) { //left neighbor
                neighbors[1] = s;
                continue;
            }
            if (s.row == up && s.column == square.column) { //up neighbor
                neighbors[2] = s;
                continue;
            }
            if (s.row == down && s.column == square.column) { //down neighbor
                neighbors[3] = s;
                continue;
            }
        }
        return neighbors; 
    }
    
    availableMoves() { 
        let s = this.selected;
        let moves = [];
        let neighbors = this.neighbors(s);

        if (s == null) { return []; }

        //can move right? 
        let available = false;
        if (s.column < this.numColumns - 1 && neighbors[0] != null) {
            available = true; 
            if (this.isColored(neighbors[0])) { // does the isColored need param
                available = false;
            }
        }
        if (available) { 
            moves.push(Right);
        }
        
        //can move left? 
        available = false;
        if (s.column > 0 && neighbors[1] != null) {
            available = true; 
            if (this.isColored(neighbors[1])) { // does the isColored need param
                available = false;
            }
        }
        if (available) { 
            moves.push(Left);
        }
        
        //can move up? 
        available = false;
        if (s.row > 0 && neighbors[2] != null) {
            available = true; 
            if (this.isColored(neighbors[2])) { // does the isColored need param
                available = false;
            }
        }
        if (available) { 
            moves.push(Up);
        }

        //can move down? 
        available = false;
        if (s.row < this.numRows - 1 && neighbors[3] != null) {
            available = true; 
            if (this.isColored(neighbors[3])) { // does the isColored need param
                available = false;
            }
        }
        if (available) { 
            moves.push(Down);
        }

        return moves;
    }
        
    sameColor(color) {
        let colorcheck = color;
        let samecolor = [];
        for (let ite in this.squares) {
            var s = this.squares[ite];
            if (s.color == colorcheck) {
                samecolor.push(s);
            }
        }
        return samecolor;
    }

    // trying to see if the selected square has the highest moveNum of all squares of the same color -- making sure its at the end of the path
    isEnd() {
        let isEnd = true;
        let samecolor = this.sameColor(this.selected.color);
        for (let ite in samecolor) {
            var s = samecolor[ite];
            if (s.moveNum > this.selected.moveNum) {
                isEnd = false;
            }
        }
        return isEnd;
    }
    
    //changing the color of the neighbor
    extend(direction) {
        
        for (let ite in this.squares) {
            var s = this.squares[ite];
            let newrow = this.selected.row + direction.deltar;
            let newcol = this.selected.column + direction.deltac;
                
            if (s.row == newrow && s.column == newcol) {
                s.setColor(this.selected.color);
                s.setmoveNum(this.selected.moveNum + 1);
            } 
        }
        if (this.selected.base == true) {  // setting initial base moveNum to -100, so now we know the highest moveNum (end of path) should be next to base with moveNum of 0
            this.selected.setmoveNum(-100);
        }
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

    available(direction) { 
        // if no piece selected, then none are available.
        if (!this.board.selected) { return false; }
        if (direction == NoMove) { return false; }
        if (this.board.selected.color == 'white' || this.board.selected.color == 'black') { return false;}
        if (this.board.isEnd() == false) { return false; }

        let allMoves = this.board.availableMoves(); //get available moves for a selected square
        return allMoves.includes(direction);
    }

    win() {     //if the base squares are next to a square with the highest moveNum, if highest moveNum is in neighbors of base
        let victory = false;
        let track = [];
        let i = 0;
        for (let ite in this.board.squares) {
            var s = this.board.squares[ite];
            if (s.color === "white") {
                return false;
            }
            if (s.moveNum == 0) {
                let neighbors = this.board.neighbors(s);
                let samecolor = this.board.sameColor(s.color);
                let x = samecolor.map(s => s.moveNum)
                let maxMove = Math.max.apply(null, x);
                
                for (let index in samecolor) {
                    var p = samecolor[index];
                    if (p.moveNum == maxMove && neighbors.indexOf(p) >= 0) {
                        track.push(true);
                        break;
                    }
                }
                i = i + 1;
            }
        }
        if (track.length == i) {
            victory = true;
            return victory;
        }
    }

    victorious() {
        this.victory = true;
    }

    notvictorious() {
        this.victory = false;
    }

    isVictorious() {
        return this.victory;
    }

    configAvailable(confignumber) {
        let available = true;
        if (confignumber == this.info.name) {
            available = false;
        }
        return available;
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
export const NoMove = new moveDirection(0, 0); 