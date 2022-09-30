import { computeSquare } from '../boundary/boundary.js';

export function selectSquare(model, canvas, event) {
    const canvasRect = canvas.getBoundingClientRect();

    // find square on which mouse was clicked
    let idx = model.board.squares.findIndex(square => {
        let rect = computeSquare(square);
        return rect.contains(event.clientX - canvasRect.left, event.clientY - canvasRect.top);
    });

    let selected = null; 
    if (idx >= 0) {
        selected = model.board.squares[idx];
    } 

    //select this piece! construct new model to represent this situation.
    model.board.select(selected);
    return model.copy();
}

export function extendColor(model, direction) {
    let selected = model.board.selected;
    if (!selected) { return model; }

    selected.extend(direction); // move color, not direction 
    //model.updateMoveNum() //have to update the moveNum to one more than the selected piece, not allowing from unused squares
    return model.copy();
}