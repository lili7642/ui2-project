import React, { useState } from "react";
import './App.css';
import Game from './components/Game.js';
import Confetti from './components/Confetti';

function App() {

  const [showConfetti, setShowConfetti] = useState(false); //Sets showConfetti-state to false, making it not render

  return (
    <>
      <div id='mainWrapper'>
        <div className="logo-container">
          <img src="thumbnail_Logo-in.png" alt="Logo" className="still-logo" />
          <img src="thumbnail_Logo-out.png" alt="Logo" className="rotating-logo" />
        </div>
        <div className='headerWrapper'>
          <div id='subHeaderWrapper1'>
            <h1 id='titleThing'>HEMNETDLE</h1>
          </div>
          <div id='subHeaderWrapper2'>
            <div className='headerIcon' id='gearDiv'>⚙️</div>
            <div className='headerIcon' id='helpDiv'>❓</div>
            <div className='headerIcon' id='chartDiv'>🏆</div>
          </div>
          
        </div>
        <Game setShowConfetti={setShowConfetti} />
        <Confetti showConfetti={showConfetti} />
      </div>
      
    </>
  );
}

export default App;
