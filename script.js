const initialWords = [
  {
    word: "persuade",
    meaning: "說服",
    type: "v.",
    example: "He tried to persuade his friend to study harder."
  },
  {
    word: "anxious",
    meaning: "焦慮的；擔心的",
    type: "adj.",
    example: "She felt anxious before the exam."
  },
  {
    word: "recommend",
    meaning: "推薦；建議",
    type: "v.",
    example: "I recommend this book to anyone who loves mystery."
  },
  {
    word: "concept",
    meaning: "概念；觀念",
    type: "n.",
    example: "The teacher explained a difficult concept clearly."
  },
  {
    word: "discover",
    meaning: "發現",
    type: "v.",
    example: "They discovered a hidden waterfall in the forest."
  },
  {
    word: "patient",
    meaning: "有耐心的；病人",
    type: "adj./n.",
    example: "Please be patient while I finish this task."
  },
  {
    word: "record",
    meaning: "記錄；錄音",
    type: "n./v.",
    example: "She kept a record of every important date."
  },
  {
    word: "practice",
    meaning: "練習；實踐",
    type: "n./v.",
    example: "Practice speaking English every day."
  },
  {
    word: "creative",
    meaning: "有創造力的",
    type: "adj.",
    example: "He found a creative solution to the problem."
  },
  {
    word: "environment",
    meaning: "環境",
    type: "n.",
    example: "Protecting the environment is everyone's responsibility."
  }
];

const STORAGE_KEY = "vocab-card-words";
const card = document.getElementById("word-card");
const frontTitle = document.getElementById("word-title");
const backMeaning = document.getElementById("word-meaning");
const backType = document.getElementById("word-type");
const backExample = document.getElementById("word-example");
const cardIndex = document.getElementById("card-index");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const form = document.getElementById("add-word-form");
const inputWord = document.getElementById("input-word");
const inputMeaning = document.getElementById("input-meaning");
const inputType = document.getElementById("input-type");
const inputExample = document.getElementById("input-example");

let words = [];
let currentIndex = 0;
let isFlipped = false;

function loadWords() {
  const storage = localStorage.getItem(STORAGE_KEY);
  if (storage) {
    try {
      const parsed = JSON.parse(storage);
      if (Array.isArray(parsed) && parsed.length > 0) {
        words = parsed;
        return;
      }
    } catch (error) {
      console.warn("Local storage parse error", error);
    }
  }
  words = [...initialWords];
}

function saveWords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

function updateCard() {
  const current = words[currentIndex];
  frontTitle.textContent = current.word;
  backMeaning.textContent = current.meaning;
  backType.textContent = current.type;
  backExample.textContent = current.example;
  cardIndex.textContent = `${currentIndex + 1} / ${words.length}`;

  if (isFlipped) {
    card.classList.add("flipped");
  } else {
    card.classList.remove("flipped");
  }
}

function resetFlip() {
  isFlipped = false;
  card.classList.remove("flipped");
}

function goNext() {
  currentIndex = (currentIndex + 1) % words.length;
  resetFlip();
  updateCard();
}

function goPrev() {
  currentIndex = (currentIndex - 1 + words.length) % words.length;
  resetFlip();
  updateCard();
}

card.addEventListener("click", () => {
  isFlipped = !isFlipped;
  card.classList.toggle("flipped", isFlipped);
});

nextButton.addEventListener("click", () => {
  goNext();
});

prevButton.addEventListener("click", () => {
  goPrev();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const word = inputWord.value.trim();
  const meaning = inputMeaning.value.trim();
  const type = inputType.value.trim();
  const example = inputExample.value.trim();

  if (!word || !meaning || !type || !example) {
    return;
  }

  words.push({ word, meaning, type, example });
  saveWords();
  currentIndex = words.length - 1;
  resetFlip();
  updateCard();
  form.reset();
});

loadWords();
updateCard();
