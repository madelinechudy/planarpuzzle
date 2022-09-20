import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Model from './model/model.js';
import { configuration_1 } from './model/puzzle.js';

var actualPuzzle = JSON.parse(JSON.stringify(configuration_1));

var model = new Model(actualPuzzle);

test('Properly renders reset button', () => {
  const { getByText } = render(<App />);
  const resetElement = getByText(/Reset/i);
  expect(resetElement).toBeInTheDocument
});