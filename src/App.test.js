import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import React from 'react';
import Model from './model/model.js';
import { configuration_1 } from './model/puzzle.js';
import { Up, Down, Left, Right } from './model/model.js';
import { extendColor } from './controller/controller';


var actualPuzzle = JSON.parse(JSON.stringify(configuration_1));


test('Properly renders Keep Trying message', () => {
  const { getByText } = render(<App />);
  const tryingElement = getByText(/Keep Trying/i);
  expect(tryingElement).toBeInTheDocument;
});

test('First valid moves', () => {
  var model = new Model(actualPuzzle);
  var piece1 = model.board.squares.find(p => p.row == 0 && p.column == 0);
  model.board.select(piece1);
  expect(model.board.selected).toBe(piece1);

  //now what moves are available? only down and right
  expect(model.available(Left)).toBe(false);
  expect(model.available(Right)).toBe(true);
  expect(model.available(Up)).toBe(false);
  expect(model.available(Down)).toBe(true);

  var piece2 = model.board.squares.find(p => p.row == 1 && p.column == 0);
  
  let newModel = extendColor(model, Down);
  expect(piece2.color).toBe('red');


  var piece3 = model.board.squares.find(p => p.row == 1 && p.column == 1);
  model.board.select(piece3);
  expect(model.board.selected).toBe(piece3);

  //now what moves are available? only down and right
  expect(model.available(Left)).toBe(false);
  expect(model.available(Right)).toBe(false);
  expect(model.available(Up)).toBe(false);
  expect(model.available(Down)).toBe(false);



});

test('Access GUI', () => {
  const { getByText } = render(<App />);

  const downButton = screen.getByTestId('downbutton');
  const rightButton = screen.getByTestId('rightbutton');
  const canvasElement = screen.getByTestId('canvas');

  // initially, this button
  expect(downButton.disabled).toBeTruthy()
  expect(rightButton.disabled).toBeTruthy()
  
  // where I click the mouse and this enables some of the buttons
  // 591 570 186 444
  fireEvent.click(canvasElement, { screenX: 57, screenY: 146, clientX:57, clientY: 42} )

   // now this button is NOT disabled
   expect(downButton.disabled).toBeFalsy()
   expect(rightButton.disabled).toBeFalsy()

   // make a left move
   fireEvent.click(downButton);

   // no longer can go further left.
   expect(downButton.disabled).toBeTruthy()

   //const movesElement = getByText(/number moves: 1/i);
   //expect(movesElement).toBeInTheDocument();
});

