import React, {useState} from 'react';
import "./Game.css"
import Image from './Image';
import husdata from './hus/hus_data';

import gameover from '../assets/sfx/game-over-sfx.mp3'

const hus = husdata[0];
const rättPris = hus.pris;
const permittedError = 0.05;
const LIFES = 5;

const gameOverSound = new Audio(gameover);

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

    const handleNumChange = (e) => {
        const allowed = /^[0-9\s]+$/;
        const limit = 20; // CHARACTER LIMIT
        const currentGuess = antiFormatString(e.target.value.slice(0, limit));
        if (allowed.test(currentGuess)){
            setGuess(prev => ({str: currentGuess, val: currentGuess}));
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        gameOverSound.play();
        addGuess();
    }

    const addGuess = () => {
        if(guess.str !== "" && numMadeGuesses !== LIFES){
            
            const score = evaluateGuess(Number(guess.val));
                            
            setGuessStack(prevStack => prevStack.map(item => (
                item.id === numMadeGuesses ? {...item, guess: guess.str, made: true, score: score} : item
            )))
            setNumMadeGuesses(numMadeGuesses + 1);
            setGuess({str: "", val: 0});
        }
    }

   

    return(
        <>
            < Image />
            
            <h1>{hus.adress}</h1>

            <div id='guessWrapper'>

                <div id='allGuessesContainer'>
                    {guessStack.map((item) => (
                        !item.made ?
                            <div
                            className= "guessDiv"
                            key={item.id}
                            >
                                GUESS {item.id + 1}/{LIFES}
                            </div>
                        :
                            <>
                            <div
                            className= "madeGuessDiv"
                            key={item.id}
                            >
                                {formatString(item.guess) + " "}
                                <span className='sekDiv'>
                                 SEK
                                </span>   
                                <span className='scoreSpan'>
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
                            value = {formatString(guess.str)}
                            onChange = {handleNumChange}
                            placeholder='Make a guess'
                        ></input>
                        <span className='inputSekDiv'>SEK</span>
                    </div>
                    <input type='submit' value={"GUESS"}/> 
                </form>
            </div>
            
        </>
    );
}

export default Game;