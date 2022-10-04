import { computeSquare } from '../boundary/boundary.js';
import Model from '../model/model.js';

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
    if (!selected) { return model; } //redundant?

    model.board.extend(direction); 
    if(model.win()) {
        model.victorious();
    }
    return model.copy();
}

export function handlereset(info) {
    let resetModel = new Model(info);
    return resetModel;
}

