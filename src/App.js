import React, { useState, useEffect } from "react";
import './App.css';
import Game from './components/Game.js';
import outer_logo from './assets/vfx/thumbnail_Logo-out.png'
import inner_logo from './assets/vfx/thumbnail_Logo-in.png'
import Confetti from './components/Confetti';
import change_lang from "./components/language";

function App() {

  /* This function runs only once on page load*/
  useEffect(() => {

    //set languagae to english if not already set
    if(!localStorage.language){
      localStorage.language = 'en';
    }
    if(!localStorage.guess1){localStorage.guess1 = '0'}
    if(!localStorage.guess2){localStorage.guess2 = '0'}
    if(!localStorage.guess3){localStorage.guess3 = '0'}
    if(!localStorage.guess4){localStorage.guess4 = '0'}
    if(!localStorage.guess5){localStorage.guess5 = '0'}

    // load all strings
    change_lang(localStorage.language);
  
    return () => {};
  }, []);

  const [showConfetti, setShowConfetti] = useState(false); //Sets showConfetti-state to false, making it not render
  const [isShowingScore, setShowingScore] = useState(false);

  const setLang = () => {
    if(localStorage.language === 'en'){
        change_lang('sv');
    }else{
      change_lang('en');
    }
  }

  const showScore = () => {
    setShowingScore(!isShowingScore);
  }

  return (
    <>
      <div id='mainWrapper'>


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
            <div className='headerIcon' id='helpDiv'>❓</div>
            <div className='headerIcon' id='chartDiv' onClick={showScore}>🏆</div>
          </div>
          
        </div>

        <div id="scorePopup"
        style={isShowingScore ? {display:'block'} : {display:'none'}}
        onClick={showScore}>
          <div id="scorePopupText"></div>
          <div id="scoreInfo">
            THE SCORE INFO
          </div>
        </div>
        
        <Game setShowConfetti={setShowConfetti} />
        <Confetti showConfetti={showConfetti} />
      </div>
    </>
  );
}

export default App;
