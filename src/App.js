import React from 'react';
import './App.css';
import Game from './components/Game.js';

function App() {
  return (
    <>
      <div id='mainWrapper'>
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
