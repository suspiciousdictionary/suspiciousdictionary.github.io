document.addEventListener('load', OnLoad());

var letter_section_div;
var sidebar_div;
var data;

function OnLoad(){
    letter_section_div = document.getElementById("main-container");
    sidebar_div = document.getElementById("letter-container");
    data = JSON.parse(dataJson);


    var letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
    letters.forEach(element => {
        CreateLetterSection(element)
        AddLetterToSidebar(element);
    });
    
    
    console.log(data.English);
    Object.keys(data.English).forEach(element => {
        AddWordToSection(element);
    })
}

function CreateLetterSection(letter){
    var section = document.createElement("div");
    section.classList += "letter-section";
    section.id = "letter-section-" + letter.toLowerCase();

    var header = document.createElement("h1");
    header.innerText = letter;
    header.classList += "letter-section-header";

    section.appendChild(header);
    letter_section_div.appendChild(section);
}

function AddWordToSection(word){
    var section_id = "letter-section-" + word[0].toLowerCase();
    console.log(section_id);
    var section = document.getElementById(section_id);

    var word_div = document.createElement("div");
    word_div.classList += "letter-section-word-container";

    var text_div = document.createElement("h1");
    text_div.innerText = word;
    text_div.classList += "letter-section-word";

    word_div.appendChild(text_div);
    section.appendChild(word_div);
}

function AddLetterToSidebar(letter){
    var letter_div = document.createElement("a");
    letter_div.classList += "sidebar-letter";
    letter_div.innerText = letter;
    letter_div.href = "#letter-section-" + letter.toLowerCase();

    sidebar_div.appendChild(letter_div);
}