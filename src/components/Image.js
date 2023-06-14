import React, {useState} from 'react';
import hus from './hus/huspicker'
import './Image.css'

/* File: Image.js

This file implements the showing of images of the houses. It gets the images for the current house
from huspicker.js and implements the ability to view and shift between all the images for the house.
The resulting component gets imported to Game.js 

*/

function Image (props) {

    const [bild, setBild] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);


    //Show next image
    const nästaBild = () => {
        bild < (hus.images.length - 1) ? setBild(bild + 1) : setBild(0);
    }


    //Show previous image
    const föregåendeBild = () => {
        bild > 0 ? setBild(bild - 1) : setBild(hus.images.length - 1);
    }


    //Make image larger when its clicked and smaller once clicked again
    const toggleSize = () => {
       setIsZoomed(!isZoomed);
    }

    return (
        <>
            <div 
            id='popupWrapper'
            style={isZoomed ? {display:'block'} : {display:'none'}}
            >
                <div id='secondPopupWrapper'>
                    <img
                    className={"image"}
                    id='popupImage'
                    alt='inzoomad bild'
                    onClick={toggleSize}
                    src={hus.images[bild]}
                    ></img>
                </div>
                
            </div>

            <div className='imageContainer'>
                <img 
                    className={"image"} 
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
                    #{bild+1}
                </span>
                <button
                    type='button'
                    onClick={nästaBild}
                >&#129094;</button>
            </div>
        </>
    );
}

export default Image