import React, {useState} from 'react';
import "./Game.css"
import Image from './Image';
import hus from './hus/huspicker';

import gameover from '../assets/sfx/game-over-sfx.mp3'
import gamewon from '../assets/sfx/game-won-sfx.mp3'

import { dyna_dict } from './language';

/* File: Game.js

This file implements the game logics, i.e. handling entering and evaluation of guesses as well as what 
happens when a guess is made. It gets the image-component from Image.js and returns a component containg image + guess-box.
*/ 


const rättPris = hus.pris;
const permittedError = 0.05;
const LIFES = 5;

// SOUND EFFECTS
const gameOverSound = new Audio(gameover);
const gameWonSound = new Audio(gamewon);


//Symbols to show after a guess is made
const scoreEmojis = {"0": "✅",
                     "-1": "🔺", 
                     "1": "🔻"};


//Function called when a guess is made, to evaluate result of guess                    
function evaluateGuess(guess){
    const pris = Number(antiFormatString(rättPris));
    if(guess < pris*(1-permittedError)){
        return(-1); // guess too low
    }else if (guess > pris*(1+permittedError)){
        return(1); // guess too high
    }else{
        return 0; // correct guess
    }
}


 // ADDS SPACES TO NUMBER e.g. 1234567 => 1 234 567
 const formatString = (str) => {
    const formattedString = str.split('').reverse().join('').replace(/(.{3})/g, '$1 ').trim().split('').reverse().join('');
    return formattedString;
}


// Remove spaces from number
const antiFormatString = (str) => {
    const reFormattedString = str.split('').reverse().join('').replace(/\s/g, '').split('').reverse().join('');
    return reFormattedString;
}


function Game(props) {

    const [guess, setGuess] = useState({str: "", val: 0});
    const [numMadeGuesses, setNumMadeGuesses] = useState(0);
    const [guessStack, setGuessStack] = useState(
        Array.from(
            {length: LIFES}, (v,i) => ({id:i, guess: 0, made: false, score: 2})
        )
    );

    //Function to update total number of games played when a game is completed
    const updateGamesPlayed = () => {
        localStorage.gamesplayed = String(1 + Number(localStorage.gamesplayed));
    }

    //Function to update the saved stats after a completed game
    const updateScore = () => {
        switch(numMadeGuesses) {
            case 0:
                localStorage.guess1 = String(Number(localStorage.guess1) + 1);
                break;
            case 1:
                localStorage.guess2 = String(Number(localStorage.guess2) + 1);
                break;
            case 2:
                localStorage.guess3 = String(Number(localStorage.guess3) + 1);
                break;
            case 3:
                localStorage.guess4 = String(Number(localStorage.guess4) + 1);
                break;
            case 4:
                localStorage.guess5 = String(Number(localStorage.guess5) + 1);
                break;

            default:
                break;
        }
    }


    //Function that handles the changes when the user enters numbers into guess-box
    const handleNumChange = (e) => {
        const allowed = /^[0-9\s]*$/;
        const limit = 20; // CHARACTER LIMIT
        const currentGuess = antiFormatString(e.target.value.slice(0, limit));
        if (allowed.test(currentGuess)){
            if(!(currentGuess.length === 1 && currentGuess === "0")){
                setGuess(prev => ({str: currentGuess, val: currentGuess}));
            }
        }
    }


    //Change current guess when the user enter their guess
    const handleSubmit = (event) => {
        event.preventDefault();
        addGuess();
    }

    
    //Game logics for when a guess is made is implemented here
    const addGuess = () => {
        if(guess.str !== "" && numMadeGuesses !== LIFES){
            
            const score = evaluateGuess(Number(guess.val));

            if(score === 0){
                // game won
                updateScore();
                updateGamesPlayed();
                gameWonSound.play();
                //alert("YOU WON");
                props.setShowConfetti(true); //Passes the showConfetti-state to App.js
            }
                            
            setGuessStack(prevStack => prevStack.map(item => (
                item.id === numMadeGuesses ? {...item, guess: guess.str, made: true, score: score} : item
            )))
            setNumMadeGuesses(numMadeGuesses + 1);
            setGuess({str: "", val: 0});

            if(numMadeGuesses === LIFES - 1 && score !== 0){
                //game lost
                gameOverSound.play();
                updateGamesPlayed();
            }
        }
    }

    return(
        <>
            < Image />
            
            <div id='adressDiv'>
                <h1>{hus.adress}</h1>
            </div>

            <div id='guessWrapper'>

                <div id='allGuessesContainer'>
                    {guessStack.map((item) => (
                        !item.made ?
                            <div
                            className= "guessDiv"
                            key={item.id}
                            >
                               <span className='guessNotMadeString'>  </span>
                               <span>{item.id + 1}/{LIFES}</span> 
                            </div>
                        :
                            <>
                            <div
                            className= "madeGuessDiv"
                            style={{backgroundColor: item.score===0 ? '#FECB2E' : '#0076A3'}}
                            key={item.id}
                            >
                                {formatString(item.guess) + " "}
                                <span className='sekDiv'>
                                 SEK
                                </span>   
                                <span className='scoreSpan' >
                                    {scoreEmojis[String(item.score)]}
                                </span>
                            </div>
                            </>
                        ))}
                </div>

                <form onSubmit={handleSubmit}>
                    
                    <div className='inputDiv'>
                        <input 
                            type='text'
                            name='make_guess_placeholder'
                            value = {formatString(guess.str)}
                            onChange = {handleNumChange}
                            placeholder={'Make a guess'}
                        ></input>
                        <span className='inputSekDiv'>SEK</span>
                    </div>
                    <input 
                    id='guessbutton' 
                    type='submit'
                    name='guess_button_placeholder'
                    value={"GUESS"}/> 
                </form>
            </div>
            
        </>
    );
}

export default Game;