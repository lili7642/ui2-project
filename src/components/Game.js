import React, {useState} from 'react';
import "./Game.css"
import husdata from './hus/hus_data';


/**
 * 
 * TODO:
 * -[x] mindre bild som går att göra större
 * -[] bilden hovrar över de andra elementen när zoomad
 * -[] numrera bilderna på skärmen
 * -[] skapa div för gjord gissning som visar om den var under eller över
 * -[] lägg till statisk "SEK" inuti input field
 * -[] visa ledtrådar
 * -[] fyll ut databas
 * -[] visa antal gissningar
 * 
 */


const hus = husdata[0];
const rättpris = hus.pris;

function Game(props) {

    const [bild, setBild] = useState(0);
    const [guess, setGuess] = useState("");
    const [stack, setStack] = useState([]);
    const [isBig, setBig] = useState(false);

    const nästaBild = () => {
        bild < (hus.images.length - 1) ? setBild(bild + 1) : setBild(0);
    }

    const föregåendeBild = () => {
        bild > 0 ? setBild(bild - 1) : setBild(hus.images.length - 1);
    }

    const toggleSize = () => {
        setBig((prev) => !prev)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addDiv();
        setGuess("");
    }

    const addDiv = () => {
        const thisGuess = guess;
        if(thisGuess !== ""){
            const newDiv = 
            <div key={stack.length}>
                {thisGuess} SEK
            </div>;
            setStack(prevStack => [newDiv, ...prevStack]);
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

            <div>
                <button
                    type='button'
                    onClick={föregåendeBild}
                >&#129092;</button>

                <button
                    type='button'
                    onClick={nästaBild}
                >&#129094;</button>
            </div>
            
            <h1>{hus.adress}</h1>

            <div>
                {stack.map(div => div)} 
            </div>

            <form onSubmit={handleSubmit}>
                <input 
                    type='number'
                    value = {guess}
                    onChange = {(e) => setGuess(e.target.value)}
                ></input>
                <input type='submit'/>
            </form>
        </>
    );
}

export default Game;