/* File: language.js

This file contains the dictionaries that holds all strings in Swedish and English.
Functions to interact with the dictionaries are also conatined here. 
*/

let dyna_dict = {
    'dyna_keys' : [
        'make_guess_placeholder',
        'guess_button_placeholder'
    ],
    'en' : {
        'make_guess_placeholder' : 'Make a guess',
        'guess_button_placeholder' : 'GUESS',
        'guessNotMadeString' : 'GUESS '
    },
    'sv' : {
        'make_guess_placeholder' : 'Skriv din gissning',
        'guess_button_placeholder' : 'GISSA',
        'guessNotMadeString' : 'GISSNING '
    }
}

let dict = {

    'keys' : [
        // 'example',
        'titleThing',
        'scorePopupText',
        'gamesPlayedString',
        "tutorialInfo1",
        "tutorialInfo2",
        'gearDiv'

    ],

    'en' : {
        // 'example' : 'example in english'
        'titleThing' : 'HEMNETDLE',
        'scorePopupText' : 'Player Score:',
        'gamesPlayedString' : 'Games played: ',
        "tutorialInfo1" : "Use the arrows to shift between the pictures. \n\nYour mission is to guess the starting price of the property!\n\n Click to continue...",
        "tutorialInfo2" : "Write your guess and press ENTER. \n\n 🔺 means you guessed too low. \n🔻 means you guessed too high. \n\nIn order to win you have to be within 5% of the correct price! \n\nClick to play...",
        'gearDiv' : '🇬🇧'

    },
    'sv' : {
        // 'example' : 'exempel på svenska'
        'titleThing' : 'HEMNETDLE',
        'scorePopupText' : 'Spelarstatistik:',
        'gamesPlayedString' : 'Antal spel: ',
        "tutorialInfo1" : "Använd pilarna för att bläddra mellan bilderna. \n\n Ditt uppdrag är att gissa utgångspriset för fastigheten! \n\n Klicka för att fortsätta...",
        "tutorialInfo2" : "Skriv din gissning och tryck ENTER.\n\n 🔺 innebär att du gissade för lågt. \n🔻 innebär att du gissade för högt. \n\n För att vinna så behöver din gissning vara inom 5% av det rätta priset! \n\n Klicka för att spela...",
        'gearDiv' : '🇸🇪'
    }
};


//Get string for certain key in current language
function get_string(key){
    return dict[localStorage.language][key];
}


//Update strings
function update_view() {
    let keys = dict['keys'];
    for (let idx in keys){
        let key = keys[idx];
        document.getElementById(key).innerText = get_string(key);
    }
    keys = dyna_dict['dyna_keys']
    document.getElementsByName('make_guess_placeholder')[0].placeholder = dyna_dict[localStorage.language]['make_guess_placeholder'];
    document.getElementsByName('guess_button_placeholder')[0].value = dyna_dict[localStorage.language]['guess_button_placeholder'];
    
    let guessDivs = document.getElementsByClassName('guessNotMadeString');
    for(let i = 0; i < guessDivs.length; i++){
        guessDivs[i].textContent = dyna_dict[localStorage.language]['guessNotMadeString'];
    }
}

//Change language variable
function change_lang(lang){
    localStorage.language = lang;
    update_view();
}

export { change_lang, dyna_dict }