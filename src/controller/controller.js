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