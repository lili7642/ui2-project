import React, {useState} from 'react';
import "./Game.css"
import husdata from './hus/hus_data';


/**
 * 
 * TODO:
 * -[] blablabla
 * -[] blablabla
 * -[] blablabla
 * -[] blablabla
 * 
 */


const hus = husdata[0];
const rättpris = hus.pris;

function Game(props) {

    const [bild, setBild] = useState(0);
    const [guess, setGuess] = useState("");
    const [stack, setStack] = useState([]);

    const nästaBild = () => {
        bild < (hus.images.length - 1) ? setBild(bild + 1) : setBild(0);
    }

    const föregåendeBild = () => {
        bild > 0 ? setBild(bild - 1) : setBild(hus.images.length - 1);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addDiv();
        setGuess("");
    }

    const addDiv = () => {
        const thisGuess = guess;
        const newDiv = 
            <div key={stack.length}>
                {thisGuess}
            </div>;
        setStack(prevStack => [...prevStack, newDiv]);
        
    }

    return(
        <>
            <div className='imageContainer'>
                <img src={hus.images[bild]} alt='Nuvarande bild'></img>
            </div>

            <div>
                <button
                    type='button'
                    onClick={föregåendeBild}
                >BACK</button>

                <button
                    type='button'
                    onClick={nästaBild}
                >NEXT</button>
            </div>
            
            <h1>{hus.adress}</h1>

            <form onSubmit={handleSubmit}>
                <input 
                    type='number'
                    value = {guess}
                    onChange = {(e) => setGuess(e.target.value)}
                ></input>
                <input type='submit'/>
            </form>
            <div>
                {stack.map(div => div)}
            </div>
        </>
    );
}

export default Game;