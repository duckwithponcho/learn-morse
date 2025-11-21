const words = ["egg"]
var usedWords = []
const morseAlphabet = {
    "A":".-",
    "B":"-...",
    "C":"-.-.",
    "D":"-..",
    "E":".",
    "F":"..-.",
    "G":"--.",
    "H":"....",
    "I":"..",
    "J":".---",
    "K":"-.-",
    "L":".-..",
    "M":"--",
    "N":"-.",
    "O":"---",
    "P":".--.",
    "Q":"--.-",
    "R":".-.",
    "S":"...",
    "T":"-",
    "U":"..-",
    "V":"...-",
    "W":".--",
    "X":"-..-",
    "Y":"-.--",
    "Z":"--.."
};
const morseNumbers = [
    "-----", // 0
    ".----", // 1
    "..---", // 2
    "...--", // 3
    "....-", // 4
    ".....", // 5
    "-....", // 6
    "--...", // 7
    "---..", // 8
    "----." // 9
]
const interactables = {
    "morse-to-word":0,
    "letter-to-morse":1
};

var displayText = document.getElementById("display-box0");
// var inputBox = document.getElementById("input-box");
var displayedInteractable;
/* Finding Default Displayed Interactable */
for (var i in interactables) {
    if (window.getComputedStyle(document.getElementById(i)).display != "none"){
        displayText = document.getElementById("display-box"+interactables[i]);
        displayedInteractable = document.getElementById(i+"-display");
        changeDisplay(i);
        break;
    }
}
/* General Navigation Functions */
function changeDisplay(interactable){
    for (var i in interactables) {
        if (i != interactable) {
            document.getElementById(i+"-display").style.display = "none";
        } else {
            document.getElementById(i+"-display").style.display = "block";
            displayText = document.getElementById("text-box"+interactables[i]);
            console.log(usedWords.length);
            displayText.textContent += getRandomWord();
            console.log(usedWords.length);
            displayedInteractable = document.getElementById(i+"-display");
        }
    }
}

/* Interactable-specific Functions */
function getRandomWord() {
    var randomWord = words[Math.floor(Math.random() * words.length)];
    console.log(words.length);
    console.log(usedWords.length);
    while (usedWords.includes(randomWord) && words.length != usedWords.length){
        randomWord = words[Math.floor(Math.random() * words.length)];
    }
    if (words.length === usedWords.length){
        return "Out of Words!";
    }
    usedWords.push(randomWord);
    return randomWord;
}

function updateDisplayText(input) {
    if (/^[a-zA-Z0-9]$/.test(input)) {
        displayText.textContent = "You typed: \"" + input.toUpperCase() + "\", which in morse is " + findMorse(input);
    } else {
        return;
    }
}

function findMorse(input) {
    if (/^[a-zA-Z]+$/.test(input)) {
        return morseAlphabet[input.toUpperCase()];
    } else {
        return morseNumbers[input];
    }
}

/* Button Fxns */
document.getElementById(Object.keys(interactables)[0]).addEventListener("click", () => {changeDisplay(Object.keys(interactables)[0])});
document.getElementById(Object.keys(interactables)[1]).addEventListener("click", () => {changeDisplay(Object.keys(interactables)[1])});

document.addEventListener("keydown", function(event) {
    if (window.getComputedStyle(displayText).display != "none"){
        updateDisplayText(event.key);
    }
});



// inputBox.addEventListener("input", () => {
//     updateDisplayText(inputBox.value);
// });