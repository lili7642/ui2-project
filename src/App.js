import React from 'react';
import './App.css';
import Game from './components/Game.js';

function App() {
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
        
        < Game />
      </div>
      
    </>
  );
}

export default App;
