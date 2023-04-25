import React, {useState} from 'react';
import husdata from './hus/hus_data';

const hus = husdata[0];

function Slideshow(props) {

    const [bild, setBild] = useState(0);

    const nästaBild = () => {
        bild < (hus.images.length - 1) ? setBild(bild + 1) : setBild(0);
    }

    return(
        <>
            <div className='imageContainer'>
                <img src={hus.images[bild]} alt='Nuvarande bild'></img>
            </div>
            <button
                type='button'
                onClick={nästaBild}
            >NÄSTABILD</button>
            <h1>{hus.adress}</h1>
        </>
    );
}

export default Slideshow;