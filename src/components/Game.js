import React, {useState} from 'react';
import "./Game.css"
import Image from './Image';
import hus from './hus/huspicker';

import gameover from '../assets/sfx/game-over-sfx.mp3'
import gamewon from '../assets/sfx/game-won-sfx.mp3'

import { dyna_dict } from './language';

const rättPris = hus.pris;
const permittedError = 0.05;
const LIFES = 5;

// SOUND EFFECTS
const gameOverSound = new Audio(gameover);
const gameWonSound = new Audio(gamewon);

const scoreEmojis = {"0": "✅",
                     "-1": "🔺", 
                     "1": "🔻"};

function evaluateGuess(guess){
    const pris = Number(antiFormatString(rättPris));
    if(guess < pris*(1-permittedError)){
        return(-1); // SVAR FÖR LÅGT
    }else if (guess > pris*(1+permittedError)){
        return(1); // SVAR FÖR HÖGT
    }else{
        return 0; // RÄTT SVAR
    }
}

 // ADDS SPACES TO NUMBER 1234567 => 1 234 567
 const formatString = (str) => {
    const formattedString = str.split('').reverse().join('').replace(/(.{3})/g, '$1 ').trim().split('').reverse().join('');
    return formattedString;
}

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

    const updateGamesPlayed = () => {
        localStorage.gamesplayed = String(1 + Number(localStorage.gamesplayed));
    }

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

    const handleSubmit = (event) => {
        event.preventDefault();
        addGuess();
    }

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