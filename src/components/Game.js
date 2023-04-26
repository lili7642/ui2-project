import React, {useState} from 'react';
import "./Game.css"
import husdata from './hus/hus_data';
import { type } from '@testing-library/user-event/dist/type';


/**
 * 
 * TODO:
 * -[x] mindre bild som går att göra större
 * -[] bilden hovrar över de andra elementen när zoomad
 * -[] numrera bilderna på skärmen
 * -[] skapa div för gjord gissning som visar om den var under eller över
 * -[x] lägg till statisk "SEK" inuti input field
 * -[] visa ledtrådar
 * -[] fyll ut databas
 * -[x] visa antal gissningar
 * -[x] input field gör mellan rum mellan siffror när man skriver => 1_000_000
 * -[] remove scroll func
 * -[] center input field text
 */


const hus = husdata[0];
const rättPris = hus.pris;
const permittedError = 0.05;
const LIFES = 5;

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

    const [bild, setBild] = useState(0);
    const [guess, setGuess] = useState({str: "", val: 0});
    const [isBig, setBig] = useState(false);
    
    const [numMadeGuesses, setNumMadeGuesses] = useState(0);
    const [guessStack, setGuessStack] = useState(
        Array.from(
            {length: LIFES}, (v,i) => ({id:i, guess: 0, made: false, score: 2})
        )
    );


    const nästaBild = () => {
        bild < (hus.images.length - 1) ? setBild(bild + 1) : setBild(0);
    }

    const föregåendeBild = () => {
        bild > 0 ? setBild(bild - 1) : setBild(hus.images.length - 1);
    }

    const toggleSize = () => {
        setBig((prev) => !prev)
    }

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
        addGuess();
    }

    const addGuess = () => {
        if(guess.str !== "" && numMadeGuesses !== LIFES){
            
            const score = evaluateGuess(Number(guess.val));
            
            switch (score) {
                case 0:
                    alert("GRATTIS DU VANN");
                    break;
                case 1:
                    alert("FÖR HÖGT");
                    break;
                case -1:
                    alert("FÖR LÅGT");
                    break;
                default:
                    break;
                }
                            
            setGuessStack(prevStack => prevStack.map(item => (
                item.id === numMadeGuesses ? {...item, guess: guess.str, made: true, score: score} : item
            )))
            setNumMadeGuesses(numMadeGuesses + 1);
            setGuess({str: "", val: 0});
        }
    }

   

    return(
        <>
            <div className='imageContainer'>
                <img 
                    className={isBig ? "image-large" : "image"} 
                    src={hus.images[bild]} 
                    alt='Nuvarande bild'
                    onClick={toggleSize}
                    ></img>
            </div>

            <div id='buttonWrapper'>
                <button
                    type='button'
                    onClick={föregåendeBild}
                >&#129092;</button>
                <span id='imageNumberSpan'>
                    {bild}
                </span>
                <button
                    type='button'
                    onClick={nästaBild}
                >&#129094;</button>
            </div>
            
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