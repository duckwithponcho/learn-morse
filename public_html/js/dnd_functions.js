import words from "./word_list.js";
// const words = [];
var usedWords = [];
const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const morseAlphabet = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
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
  "----.", // 9
];
const interactables = {
  "morse-to-char": 0,
  "morse-to-word": 1,
  "char-to-morse": 2,
  "word-to-morse": 3,
};

var interactable;
var textBox;
var originalText;
var inputBox;
var displayedInteractable;
var feedbackText;

/* Finding Default Displayed Interactable */
for (var i in interactables) {
  if (window.getComputedStyle(document.getElementById(i)).display != "none") {
    interactable = i;
    textBox = document.getElementById("text-box" + interactables[i]);
    originalText = textBox.textContent;
    inputBox = document.getElementById("input-box" + interactables[i]);
    displayedInteractable = document.getElementById(i + "-display");
    feedbackText = document.getElementById("feedback-box" + interactables[i]);
    changeDisplay(i);
    break;
  }
}
/* General Navigation Functions */
/*
 * Updates interactable displayed when an interactable button is pressed, hides other displays not pressed
 */
function changeDisplay(interactable) {
  usedWords = [];
  feedbackText.textContent = "";
  for (var i in interactables) {
    if (i != interactable) {
      document.getElementById(i + "-display").style.display = "none";
    } else if (
      document.getElementById(interactable + "-display") !=
      displayedInteractable
    ) {
      interactable = i;
      textBox.textContent = originalText;
      displayedInteractable = document.getElementById(i + "-display");
      displayedInteractable.style.display = "block";
      textBox = document.getElementById("text-box" + interactables[i]);
      originalText = textBox.textContent;
      inputBox = document.getElementById("input-box" + interactables[i]);
      feedbackText = document.getElementById("feedback-box" + interactables[i]);
      textBox.textContent = originalText + getRandom(interactable);
    } else {
      textBox.textContent = originalText + getRandom(interactable);
    }
  }
}

/* Interactable-specific Functions */

function getRandom(interactable){
  if (interactables[interactable] % 2 == 0){
    return getRandomChar();
  } else {
    return getRandomWord();
  }
}

function getRandomChar() {
  var randomNum = Math.floor(
    Math.random() * (alphabet.length + numbers.length)
  );
  if (randomNum > alphabet.length) {
    randomNum -= (alphabet.length + 1); // 0-9 range
    return numbers[randomNum];
  } else {
    return alphabet[randomNum];
  }
}

function getRandomWord() {
  var randomWord = words[Math.floor(Math.random() * words.length)];
  while (usedWords.includes(randomWord) && words.length != usedWords.length) {
    randomWord = words[Math.floor(Math.random() * words.length)];
  }
  if (words.length === usedWords.length) {
    return "Out of Words!";
  }
  usedWords.push(randomWord);
  return randomWord;
}

// function updateDisplayText(input) {
//   if (/^[a-zA-Z0-9]$/.test(input)) {
//     inputBox.textContent =
//       'You typed: "' +
//       input.toUpperCase() +
//       '", which in morse is ' +
//       findMorse(input);
//   } else {
//     return;
//   }
// }

// function findMorse(input) {
//   if (/^[a-zA-Z]+$/.test(input)) {
//     return morseAlphabet[input.toUpperCase()];
//   } else {
//     return morseNumbers[input];
//   }
// }

/* Button Fxns */
document
  .getElementById(Object.keys(interactables)[0])
  .addEventListener("click", () => {
    changeDisplay(Object.keys(interactables)[0]);
  });
document
  .getElementById(Object.keys(interactables)[1])
  .addEventListener("click", () => {
    changeDisplay(Object.keys(interactables)[1]);
  });
document
  .getElementById(Object.keys(interactables)[2])
  .addEventListener("click", () => {
    changeDisplay(Object.keys(interactables)[2]);
  });
document
  .getElementById(Object.keys(interactables)[3])
  .addEventListener("click", () => {
    changeDisplay(Object.keys(interactables)[3]);
  });

// document.addEventListener("keydown", function (event) {
//   if (window.getComputedStyle(inputBox).display != "none") {
//     updateDisplayText(event.key);
//   }
// });
