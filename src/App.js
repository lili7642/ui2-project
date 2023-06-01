import React, { useState, useEffect } from "react";
import './App.css';
import Game from './components/Game.js';
import outer_logo from './assets/vfx/thumbnail_Logo-out.png'
import inner_logo from './assets/vfx/thumbnail_Logo-in.png'
import Confetti from './components/Confetti';
import { change_lang } from "./components/language";

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

    if(!localStorage.gamesplayed){
      localStorage.gamesplayed = '0';
    }

    // load all strings
    change_lang(localStorage.language);
  
    return () => {};
  }, []);

  const [showConfetti, setShowConfetti] = useState(false); //Sets showConfetti-state to false, making it not render
  const [isShowingScore, setShowingScore] = useState(false);

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
            <div className='headerIcon' id='gearDiv' onClick={setLang}>🌎</div>
            <div className='headerIcon' id='helpDiv' onClick={handleButtonClick}>❓</div>
            <div className='headerIcon' id='chartDiv' onClick={showScore}>🏆</div>
          </div>
          
        </div>

        <div id="scorePopup"
        style={isShowingScore ? {display:'block'} : {display:'none'}}
        onClick={showScore}>
          <div id="scorePopupText"></div>
          <div id="scoreInfo">
            <div>
              <span>1️⃣:  </span><span> {localStorage.guess1}</span>
            </div>
            <div>
              <span>2️⃣: </span><span> {localStorage.guess2}</span>
            </div>
            <div>
              <span>3️⃣: </span><span> {localStorage.guess3}</span>
            </div>
            <div>
              <span>4️⃣: </span><span> {localStorage.guess4}</span>
            </div>
            <div>
              <span>5️⃣: </span><span> {localStorage.guess5}</span>
            </div>
            <div> 
              <span id="gamesPlayedString"></span>
              <span>{localStorage.gamesplayed}</span>
            </div>
          </div>
        </div>
        
        <Game setShowConfetti={setShowConfetti} />
      </div>
        <Confetti showConfetti={showConfetti} />

      <div className={`tint1 ${isTinted1 ? 'visible' : ''}`} onClick={handleScreenClick1}>
      <div id="tutorialInfo1"><p>heyhey</p></div>
      </div>
      <div className={`tint2 ${isTinted1 ? 'visible' : ''}`} onClick={handleScreenClick1}></div>
      <div className={`tint3 ${isTinted1 ? 'visible' : ''}`} onClick={handleScreenClick1}></div>
      <div className={`tint4 ${isTinted1 ? 'visible' : ''}`} onClick={handleScreenClick1}></div>


      <div className={`tint5 ${isTinted2 ? 'visible' : ''}`} onClick={handleScreenClick2}></div>
      <div className={`tint6 ${isTinted2 ? 'visible' : ''}`} onClick={handleScreenClick2}></div>
      <div className={`tint7 ${isTinted2 ? 'visible' : ''}`} onClick={handleScreenClick2}></div>
      <div className={`tint8 ${isTinted2 ? 'visible' : ''}`} onClick={handleScreenClick2}>
      <div id="tutorialInfo2"><p>heyhey</p></div>
      </div>
    </>
  );
}

export default App;
