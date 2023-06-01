import React, { useState } from "react";
import './App.css';
import Game from './components/Game.js';
import outer_logo from './assets/vfx/thumbnail_Logo-out.png'
import inner_logo from './assets/vfx/thumbnail_Logo-in.png'
import Confetti from './components/Confetti';
import change_lang from "./components/language";

function App() {

  const [showConfetti, setShowConfetti] = useState(false); //Sets showConfetti-state to false, making it not render

  const [isTinted1, setIsTinted1] = useState(false);
  const [isTinted2, setIsTinted2] = useState(false);

  const handleButtonClick = () => {
    setIsTinted1(true);
    document.body.style.overflowY = 'hidden';
  };

  const handleScreenClick1 = () => {
    setIsTinted1(false);
    setIsTinted2(true);
  };

  const handleScreenClick2 = () => {
    setIsTinted2(false);
    document.body.style.overflowY = 'scroll';
  };

  const setLang = () => {
    if(localStorage.language === 'en'){
        change_lang('sv');
    }else{
      change_lang('en');
    }
  }

  const showScore = () => {
    
  }

  return (
    <>
      <div id='mainWrapper'>
        <div id="scorePopup">

        </div>

        <div className='headerWrapper'>
          <div id='subHeaderWrapper1'>
            <div className="logo-container">
              <img src={inner_logo} alt="Logo1" className="rotating-logo" />
              <img src={outer_logo} alt="Logo" className="still-logo" />
            </div>
            <div className="headercontainer">
              <h1 id='titleThing'>HEMNETDLE</h1>
            </div>
          </div>
          <div id='subHeaderWrapper2'>
            <div className='headerIcon' id='gearDiv' onClick={setLang}>⚙️</div>
            <div className='headerIcon' id='helpDiv' onClick={handleButtonClick}>❓</div>
            <div className='headerIcon' id='chartDiv'>🏆</div>
          </div>
          
        </div>
        
        <Game setShowConfetti={setShowConfetti} />
        <Confetti showConfetti={showConfetti} />
      </div>

      <div className={`tint1 ${isTinted1 ? 'visible' : ''}`} onClick={handleScreenClick1}></div>
      <div className={`tint2 ${isTinted1 ? 'visible' : ''}`} onClick={handleScreenClick1}></div>
      <div className={`tint3 ${isTinted1 ? 'visible' : ''}`} onClick={handleScreenClick1}></div>
      <div className={`tint4 ${isTinted1 ? 'visible' : ''}`} onClick={handleScreenClick1}></div>

      <div className={`tint5 ${isTinted2 ? 'visible' : ''}`} onClick={handleScreenClick2}></div>
      <div className={`tint6 ${isTinted2 ? 'visible' : ''}`} onClick={handleScreenClick2}></div>
      <div className={`tint7 ${isTinted2 ? 'visible' : ''}`} onClick={handleScreenClick2}></div>
      <div className={`tint8 ${isTinted2 ? 'visible' : ''}`} onClick={handleScreenClick2}></div>
    </>
  );
}

export default App;
