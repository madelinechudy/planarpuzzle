import React from 'react';
import logo from './logo.svg';
import './App.css';
import { layout } from './layout.js'; 
import Model from './model/model.js';
import { redrawCanvas } from './boundary/boundary.js';
import { configuration_1 } from './model/puzzle.js';

var actualPuzzle = JSON.parse(JSON.stringify(configuration_1)); //parses strings into JSON objects

function App() {
  //initial instantiation of Model
  const [model, setModel] = React.useState(new Model(actualPuzzle));
  
  const appRef = React.useRef(null);    //need to be able to refer to App
  const canvasRef = React.useRef(null); //need to be able to refer to Canvas

  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model]) //second argument is critical, declares when to refresh



  
  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
        />
        <label style={layout.text}>number moves: </label>
        <div style={layout.buttons}>
        <button style={layout.upbutton}>^</button>
        </div>
    </main>
  );
}

export default App;
