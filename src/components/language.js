

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
        'gamesPlayedString'

    ],

    'en' : {
        // 'example' : 'example in english'
        'titleThing' : 'HEMNETDLE',
        'scorePopupText' : 'Player Score:',
        'gamesPlayedString' : 'Games played: ',

    },
    'sv' : {
        // 'example' : 'exempel på svenska'
        'titleThing' : 'HEMNETDLE',
        'scorePopupText' : 'Spelarstatistik:',
        'gamesPlayedString' : 'Antal spel: '
    }
};

function get_string(key){
    return dict[localStorage.language][key];
}

function update_view() {
    let keys = dict['keys'];
    for (let idx in keys){
        let key = keys[idx];
        document.getElementById(key).textContent = get_string(key);
    }
    keys = dyna_dict['dyna_keys']
    document.getElementsByName('make_guess_placeholder')[0].placeholder = dyna_dict[localStorage.language]['make_guess_placeholder'];
    document.getElementsByName('guess_button_placeholder')[0].value = dyna_dict[localStorage.language]['guess_button_placeholder'];
    
    let guessDivs = document.getElementsByClassName('guessNotMadeString');
    for(let i = 0; i < guessDivs.length; i++){
        guessDivs[i].textContent = dyna_dict[localStorage.language]['guessNotMadeString'];
    }
}

function change_lang(lang){
    localStorage.language = lang;
    update_view();
}

export { change_lang, dyna_dict }