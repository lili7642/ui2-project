import React, {useState} from 'react';
import husdata from './hus/hus_data';


const hus = husdata[0];

function Image (props) {

    const [bild, setBild] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const nästaBild = () => {
        bild < (hus.images.length - 1) ? setBild(bild + 1) : setBild(0);
    }

    const föregåendeBild = () => {
        bild > 0 ? setBild(bild - 1) : setBild(hus.images.length - 1);
    }

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
                    #{bild}
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