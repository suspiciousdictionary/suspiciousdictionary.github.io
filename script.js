OnLoad();

var letter_section_div;
var sidebar_div;
var big_data;
var info_div;
var lang;
var data;

function OnLoad(){
    letter_section_div = document.getElementById("main-container");
    sidebar_div = document.getElementById("letter-container");
    info_div = document.getElementById("word-information");
    big_data = JSON.parse(dataJson);


    var letters = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');
    letters.forEach(element => {
        CreateLetterSection(element)
        AddLetterToSidebar(element);
    });

    var query_string = window.location.search;
    var args = new URLSearchParams(query_string);
    var lang_code = args.get("lang");
    switch(lang_code){
      case "sr":
        lang = "Serbian";
        break;
      case "de":
        lang = "German";
        break;
      default:
        lang = "English"
    }

    data = big_data[lang];

    Object.keys(data).forEach(element => {
        AddWordToSection(element);
    });
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
    var section = document.getElementById(section_id);

    var word_div = document.createElement("div");
    word_div.classList += "letter-section-word-container";
    word_div.addEventListener("click", PopulateInfo)

    var text_div = document.createElement("h1");
    text_div.innerText = word;
    text_div.classList += "letter-section-word";

    var hasImage = data[word].HasImage;
    var desc = data[word].Description;
    var buttons = data[word].Buttons;

    if(hasImage==true || desc!=null || buttons!=null){
        word_div.classList.add("word-has-context");
    }

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

function PopulateInfo(event){
    var word = event.target.innerText;
    var hasImage = data[word].HasImage;
    var desc = data[word].Description;
    var buttons = data[word].Buttons;

    if(hasImage==false && desc==null && buttons==null){
        ToggleVisibility(info_div, false)
    }else{
        ToggleVisibility(info_div, true)

        var title_div = document.getElementById("info-title");
        title_div.innerText = word;

        var img_div = document.getElementById("info-img");
        if(hasImage==false){
            ToggleVisibility(img_div, false)
        }
        else{
            ToggleVisibility(img_div, true)
            img_div.src = "images/"+word+".png";
        }

        var desc_div = document.getElementById("info-desc");
        if(desc == null){
            ToggleVisibility(desc_div, false)
        }
        else{
            ToggleVisibility(desc_div, true)
            desc_div.innerText = desc;
        }

    }

}

function ToggleVisibility(div, isVisible){
    if(isVisible){
        if(div.classList.contains("hidden")) { div.classList.remove("hidden"); }
    }else{
        if(div.classList.contains("hidden")==false) { div.classList.add("hidden"); }
    }

}
