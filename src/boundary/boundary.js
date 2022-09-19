//Redraw entire canvas from model
export function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');

    //clear canvas area before rendering the coordinates held in state
    ctx.clearRect(0,0, canvasObj.width, canvasObj.height);

    let nr = model.board.numRows;
    let nc = model.board.numColumns;

    ctx.fillStyle = 'yellow';
    ctx.fillRect(0,0,10*nc,10*nr);
}