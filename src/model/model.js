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
        
        var allSquares = [];
        for(let s of info.baseSquares) {
            allSquares.push(new Square(parseInt(s.row), parseInt(s.column), s.color, 0, true, false));
        }
        for(let s of info.unusedSquares) {
            allSquares.push(new Square(parseInt(s.row), parseInt(s.column), 'black', null, false, true));
        }
        
        var i = 0
        var j = 0
        while(i < numRows){
            while(j < numColumns) {
                if(i == allSquares.row && j == allSquares.column) {
                    j = j+1;
                }
                else {
                    allSquares.push(new Square(i, j, 'white', null, false, false));
                    j = j+1;
                }
            }
            i = i+1;
        }
        
        
        //white, if there is not a Square object in the position, create a blank square
        //for(let s of info.baseSquares) {

        //}
        //allSquares.push(new Square(s.row, s.column, 'white', null, false, false));

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