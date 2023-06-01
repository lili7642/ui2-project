import React, { useState } from "react";
import './App.css';
import Game from './components/Game.js';
import outer_logo from './assets/vfx/thumbnail_Logo-out.png'
import inner_logo from './assets/vfx/thumbnail_Logo-in.png'
import Confetti from './components/Confetti';
import change_lang from "./components/language";

function App() {

  const [showConfetti, setShowConfetti] = useState(false); //Sets showConfetti-state to false, making it not render

  const setLang = () => {
    if(localStorage.language === 'en'){
        change_lang('sv');
    }else{
      change_lang('en');
    }
  }

  return (
    
    <>
      <div id='mainWrapper'>
        <div className='headerWrapper'>
          <div id='subHeaderWrapper1'>
            <div className="logo-container">
              <img src={inner_logo} alt="Logo1" className="still-logo" />
              <img src={outer_logo} alt="Logo" className="rotating-logo" />
            </div>
            <div className="headercontainer">
              <h1 id='titleThing'>HEMNETDLE</h1>
            </div>
          </div>
          <div id='subHeaderWrapper2'>
            <div className='headerIcon' id='gearDiv' onClick={setLang}>⚙️</div>
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
