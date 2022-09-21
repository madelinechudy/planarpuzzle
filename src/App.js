import React from 'react';
import logo from './logo.svg';
import './App.css';
import { layout } from './layout.js'; 
import Model from './model/model.js';
import { redrawCanvas } from './boundary/boundary.js';
import { configuration_1 } from './model/puzzle.js';
import { selectSquare } from './controller/controller.js';

var actualPuzzle = JSON.parse(JSON.stringify(configuration_1)); //parses strings into JSON objects

function App() {
  //initial instantiation of Model
  const [model, setModel] = React.useState(new Model(actualPuzzle));
  
  const appRef = React.useRef(null);    //need to be able to refer to App
  const canvasRef = React.useRef(null); //need to be able to refer to Canvas

  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model]) //second argument is critical, declares when to refresh

  const handleClick = (e) => {
    let newModel = selectSquare(model, canvasRef.current, e);
    setModel(newModel); //react to changes, if model has changed
  }
  
  return (
    <main style={layout.Appmain} ref={appRef}>
      <canvas tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
        onClick={handleClick}
        />
        <label style={layout.text}>Congratulations!!! </label>
        <div style={layout.buttons}>
          <button style={layout.resetbutton}>Reset</button>
          <button style={layout.upbutton}>^</button>
          <button style={layout.leftbutton}>&lt;</button>
          <button style={layout.rightbutton}>&gt;</button>
          <button style={layout.downbutton}>v</button>
        </div>
    </main>
  );
}

export default App;
