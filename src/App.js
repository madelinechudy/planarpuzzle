import React from 'react';
import './App.css';
import { layout } from './layout.js'; 
import Model from './model/model.js';
import { redrawCanvas } from './boundary/boundary.js';
import { configuration_1, configuration_2, configuration_3 } from './model/puzzle.js';
import { selectSquare, extendColor, handlereset } from './controller/controller.js';
import { Up, Down, Left, Right } from './model/model.js';

//gotta change to variable
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
  
  const extendColorHandler = (direction) => {
    let newModel = extendColor(model, direction);
    setModel(newModel);   //react to changes, if model has changed
  }

  const resetHandler = (info) => {
    let resetModel = handlereset(info);
    setModel(resetModel);
  }

  const ConfigHandler = (config) => {
    actualPuzzle = JSON.parse(JSON.stringify(config)); //parses strings into JSON objects
    setModel(new Model(actualPuzzle));
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
        { model.isVictorious() ? (<label data-testid="victory-label" style={layout.victory}>You've Won!</label>) : null }
        { model.isVictorious() == false ? (<label data-testid="victory-label" style={layout.victory}>Keep Trying</label>) : null }
        
        <div style={layout.buttons}>
          <button style={layout.resetbutton} onClick={(e) => resetHandler(actualPuzzle)}>Reset</button>
          <button style={layout.upbutton} onClick={(e) => extendColorHandler(Up)} disabled={!model.available(Up)}>^</button>
          <button style={layout.leftbutton} onClick={(e) => extendColorHandler(Left)} disabled={!model.available(Left)}>&lt;</button>
          <button style={layout.rightbutton} onClick={(e) => extendColorHandler(Right)} disabled={!model.available(Right)}>&gt;</button>
          <button style={layout.downbutton} onClick={(e) => extendColorHandler(Down)} disabled={!model.available(Down)}>v</button>
          <button style={layout.config1} onClick={(e) => ConfigHandler(configuration_1)} disabled={!model.configAvailable("Configuration #1")}>Configuration #1</button>
          <button style={layout.config2} onClick={(e) => ConfigHandler(configuration_2)} disabled={!model.configAvailable("Configuration #2")}>Configuration #2</button>
          <button style={layout.config3} onClick={(e) => ConfigHandler(configuration_3)} disabled={!model.configAvailable("Configuration #3")}>Configuration #3</button>
        </div>
    </main>
  );
}

export default App;
