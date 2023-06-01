



let dict = {

    'keys' : [
        // 'example',
        'titleThing',
        'scorePopupText',
        'gamesPlayedString',

    ],

    'en' : {
        // 'example' : 'example in english'
        'titleThing' : 'HEMNETDLE',
        'scorePopupText' : 'Player Score:',
        'gamesPlayedString' : 'Games played: '
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
}

function change_lang(lang){
    localStorage.language = lang;
    update_view();
}

export default change_lang;