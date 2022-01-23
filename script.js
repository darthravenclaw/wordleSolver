let turn = 0;
let include = "";
let exclude = "";
let rightPos = ["*", "*", "*", "*", "*"];
let posExclude = ["*", "*", "*", "*", "*"];

const btn = document.getElementById("run");
btn.addEventListener("click", setup);
const allWordsBox = document.getElementById("wordContainer");

for (let j = 1; j <= 6; j++) {
  const wordsBox = document.createElement("div");
  wordsBox.classList.add("wordBox");
  for (let i = 1; i <= 5; i++) {
    const newInput = document.createElement("input"); //input element, text
    newInput.setAttribute("type", "text");
    newInput.setAttribute("readonly", true);
    newInput.setAttribute("name", "username");
    newInput.setAttribute("value", "default");
    newInput.setAttribute("maxlength", 1);
    newInput.setAttribute("id", "w" + j + "l" + i);
    newInput.addEventListener("keyup", logKey);
    newInput.addEventListener("click", changeClass);
    newInput.value = "";
    newInput.classList.add("letter");
    wordsBox.appendChild(newInput);
  }
  allWordsBox.appendChild(wordsBox);
}

function setup() {
  document.querySelectorAll(".include").forEach(includeForEach);
  document
    .querySelectorAll(".exclude")
    .forEach((letter) => (exclude += letter.value));
  document
    .querySelectorAll(".rightSpot")
    .forEach((letter) => (rightPos[letter.id[3] - 1] = letter.value));
  turn++;
  setWord(turn, getWord());
}
function includeForEach(letter) {
  posExclude[letter.id[3]] += letter.value;
  include += letter.value;
}
function setWord(resultNum, word) {
  for (let i = 0; i < 5; i++) {
    document.getElementById("w" + resultNum + "l" + (i + 1)).value =
      word[i].toUpperCase();
  }
}

function getWord() {
  wIncludes = words.filter(filterInclude);
  wExcludes = wIncludes.filter(filterExclude);
  wGuess = wExcludes.filter(filterGuess);
  wPosExcludes = wGuess.filter(filterPosExclude);
  const w = wPosExcludes.sort(sortFreq).splice(0, 100).sort(sortLetters);
  return w[0].word;
}

function filterInclude(word) {
  for (let i = 0; i < include.length; i++) {
    if (!word.word.toLowerCase().includes(include[i].toLowerCase())) {
      return false;
    }
  }
  return true;
}
function filterExclude(word) {
  for (let i = 0; i < exclude.length; i++) {
    if (word.word.toLowerCase().includes(exclude[i].toLowerCase())) {
      return false;
    }
  }
  return true;
}
function filterGuess(word) {
  for (let i = 0; i < rightPos.length; i++) {
    if (
      rightPos[i] != "*" &&
      rightPos[i].toUpperCase() != word.word.toUpperCase()[i]
    ) {
      return false;
    }
  }
  return true;
}
function filterPosExclude(word) {
  for (let i = 0; i < posExclude.length; i++) {
    if (posExclude[i] != "*") {
      if (
        posExclude[i].toUpperCase().includes(word.word.toUpperCase()[i - 1])
      ) {
        return false;
      }
    }
  }
  return true;
}
function sortLetters(first, second) {
  if (first.letters < second.letters) {
    return 1;
  } else if (first.letters > second.letters) {
    return -1;
  } else {
    return 0;
  }
}
function sortFreq(first, second) {
  if (first.freq < second.freq) {
    return 1;
  } else {
    return -1;
  }
}

function autoTab(field1, len, field2) {
  if (document.getElementById(field1).value.length == len) {
    document.getElementById(field2).focus();
  }
}

function logKey(e) {
  const t = document.getElementById(e.target.id);
  t.value = t.value.toUpperCase();
}
function changeClass(e) {
  const t = document.getElementById(e.target.id);
  if (t.value.length == 1) {
    if (t.classList.contains("exclude")) {
      t.classList.remove("exclude");
      t.classList.add("include");
    } else if (t.classList.contains("include")) {
      t.classList.remove("include");
      t.classList.add("rightSpot");
    } else if (t.classList.contains("rightSpot")) {
      t.classList.remove("rightSpot");
    } else {
      t.classList.add("exclude");
    }
  }
}
