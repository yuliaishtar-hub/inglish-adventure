import familyLesson from "../lessons/family.js";

import {
  addXP,
  addGems,
  completeLesson,
  completeQuest,
  getPlayer
} from "./player.js";

import {
  speak,
  recognizeSpeech,
  canRecognizeSpeech,
  speechMatches
} from "./voice.js";


/* =====================================
   LESSONS
===================================== */

const lessons = {
  family: familyLesson
};


/* =====================================
   STATE
===================================== */

let currentLesson = null;
let currentStage = 0;

let stageAnswered = false;
let selectedWords = [];


/* =====================================
   DOM
===================================== */

const screens = {
  home: document.getElementById("home"),
  map: document.getElementById("map"),
  lesson: document.getElementById("lesson"),
  reward: document.getElementById("reward")
};

const lessonContent =
  document.getElementById("lessonContent");

const progressBar =
  document.getElementById("progressBar");

const stageLabel =
  document.getElementById("stageLabel");

const lessonXP =
  document.getElementById("lessonXP");

const lessonGems =
  document.getElementById("lessonGems");

const xpValue =
  document.getElementById("xpValue");

const gemsValue =
  document.getElementById("gemsValue");

const toast =
  document.getElementById("toast");


/* =====================================
   SCREEN MANAGEMENT
===================================== */

function showScreen(name) {

  Object.values(screens).forEach(screen => {
    screen.classList.remove("active");
  });

  screens[name].classList.add("active");

  updatePlayerUI();
}


function showHome() {
  showScreen("home");
}


function showMap() {
  showScreen("map");
}


/* =====================================
   PLAYER UI
===================================== */

function updatePlayerUI() {

  const player = getPlayer();

  document.getElementById("playerName").textContent =
    player.name;

  xpValue.textContent =
    player.xp;

  gemsValue.textContent =
    player.gems;

  lessonXP.textContent =
    player.xp;

  lessonGems.textContent =
    player.gems;
}


/* =====================================
   TOAST
===================================== */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}


/* =====================================
   START LESSON
===================================== */

function startLesson(key) {

  const lesson = lessons[key];

  if (!lesson) {
    showToast("This adventure is coming soon!");
    return;
  }

  currentLesson = lesson;
  currentStage = 0;

  stageAnswered = false;
  selectedWords = [];

  showScreen("lesson");

  renderStage();
}


/* =====================================
   RENDER STAGE
===================================== */

function renderStage() {

  if (!currentLesson) {
    return;
  }

  const stage =
    currentLesson.stages[currentStage];

  stageAnswered = false;
  selectedWords = [];

  const total =
    currentLesson.stages.length;

  const progress =
    ((currentStage + 1) / total) * 100;

  progressBar.style.width =
    `${progress}%`;

  stageLabel.textContent =
    `${currentLesson.title} · ${currentStage + 1}/${total}`;

  lessonContent.innerHTML = "";

  switch (stage.type) {

    case "story":
      renderStory(stage);
      break;

    case "vocabulary":
      renderVocabulary(stage);
      break;

    case "listen":
      renderListen(stage);
      break;

    case "choose":
      renderChoose(stage);
      break;

    case "sentence":
      renderSentence(stage);
      break;

    case "reading":
      renderReading(stage);
      break;

    case "speak":
      renderSpeak(stage);
      break;

    case "quest":
      renderQuest(stage);
      break;

    default:
      lessonContent.innerHTML =
        "<h2>Stage not found.</h2>";
  }

  updatePlayerUI();
}


/* =====================================
   COMMON HELPERS
===================================== */

function createElement(
  tag,
  className,
  text
) {

  const element =
    document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  return element;
}


function addNextButton(text = "Continue →") {

  const button =
    createElement(
      "button",
      "next-button",
      text
    );

  button.addEventListener(
    "click",
    nextStage
  );

  lessonContent.appendChild(button);

  return button;
}


function addListenButton(text) {

  const button =
    createElement(
      "button",
      "listen-button",
      text || "🔊 Listen"
    );

  button.addEventListener(
    "click",
    () => {
      const stage =
        currentLesson.stages[currentStage];

      if (stage.text) {
        speak(stage.text);
      }

      if (stage.target) {
        speak(stage.target);
      }
    }
  );

  return button;
}


/* =====================================
   STORY
===================================== */

function renderStory(stage) {

  lessonContent.appendChild(
    createElement(
      "div",
      "lesson-kicker",
      "Story"
    )
  );

  lessonContent.appendChild(
    createElement(
      "h1",
      "lesson-title",
      stage.title
    )
  );

  const card =
    createElement(
      "div",
      "character-card"
    );

  if (stage.image) {

    const image =
      document.createElement("img");

    image.src =
      stage.image;

    image.alt =
      stage.title;

    card.appendChild(image);
  }

  const speech =
    createElement(
      "div",
      "speech-box",
      stage.text
    );

  card.appendChild(speech);

  lessonContent.appendChild(card);

  const listen =
    addListenButton();

  lessonContent.appendChild(listen);

  addNextButton();
}


/* =====================================
   VOCABULARY
===================================== */

function renderVocabulary(stage) {

  lessonContent.appendChild(
    createElement(
      "div",
      "lesson-kicker",
      "Vocabulary"
    )
  );

  lessonContent.appendChild(
    createElement(
      "h1",
      "lesson-title",
      stage.title
    )
  );

  lessonContent.appendChild(
    createElement(
      "p",
      "lesson-text",
      "Tap a picture to hear the word."
    )
  );

  const grid =
    createElement(
      "div",
      "answer-grid"
    );

  stage.words.forEach(item => {

    const button =
      createElement(
        "button",
        "answer-button"
      );

    const image =
      document.createElement("img");

    image.src =
      item.image;

    image.alt =
      item.word;

    image.style.width = "100%";
    image.style.height = "130px";
    image.style.objectFit = "contain";

    const word =
      createElement(
        "div",
        "",
        item.word
      );

    word.style.marginTop = "8px";

    button.appendChild(image);
    button.appendChild(word);

    button.addEventListener(
      "click",
      () => speak(item.word)
    );

    grid.appendChild(button);
  });

  lessonContent.appendChild(grid);

  addNextButton(
    "I know these words →"
  );
}


/* =====================================
   LISTEN
===================================== */

function renderListen(stage) {

  lessonContent.appendChild(
    createElement(
      "div",
      "lesson-kicker",
      "Listen"
    )
  );

  lessonContent.appendChild(
    createElement(
      "h1",
      "lesson-title",
      stage.title
    )
  );

  if (stage.image) {

    const card =
      createElement(
        "div",
        "character-card"
      );

    const image =
      document.createElement("img");

    image.src =
      stage.image;

    image.alt =
      "Family";

    card.appendChild(image);

    lessonContent.appendChild(card);
  }

  lessonContent.appendChild(
    createElement(
      "div",
      "speech-box",
      "Listen and repeat."
    )
  );

  const listen =
    addListenButton("🔊 Listen");

  lessonContent.appendChild(listen);

  addNextButton(
    "Next →"
  );
}


/* =====================================
   CHOOSE
===================================== */

function renderChoose(stage) {

  lessonContent.appendChild(
    createElement(
      "div",
      "lesson-kicker",
      "Mission"
    )
  );

  lessonContent.appendChild(
    createElement(
      "h1",
      "lesson-title",
      stage.title
    )
  );

  lessonContent.appendChild(
    createElement(
      "p",
      "lesson-text",
      stage.text
    )
  );

  if (stage.image) {

    const image =
      document.createElement("img");

    image.src =
      stage.image;

    image.alt =
      "Question";

    image.style.width = "min(400px, 80vw)";
    image.style.height = "250px";
    image.style.objectFit = "contain";

    lessonContent.appendChild(image);
  }

  const grid =
    createElement(
      "div",
      "answer-grid"
    );

  stage.answers.forEach(answer => {

    const button =
      createElement(
        "button",
        "answer-button",
        answer
      );

    button.addEventListener(
      "click",
      () => {

        if (stageAnswered) {
          return;
        }

        if (
          answer === stage.correct
        ) {

          stageAnswered = true;

          button.classList.add(
            "correct"
          );

          addXP(10);
          addGems(1);

          speak("Great job!");

          showToast(
            "⭐ +10 XP   💎 +1 Gem"
          );

          setTimeout(() => {
            nextStage();
          }, 800);

        } else {

          button.classList.add(
            "wrong"
          );

          speak("Try again!");

          showToast(
            "Try again!"
          );
        }

      }
    );

    grid.appendChild(button);
  });

  lessonContent.appendChild(grid);

  const listen =
    addListenButton(
      "🔊 Hear the question"
    );

  lessonContent.appendChild(listen);
}


/* =====================================
   SENTENCE BUILDER
===================================== */

function renderSentence(stage) {

  lessonContent.appendChild(
    createElement(
      "div",
      "lesson-kicker",
      "Sentence Builder"
    )
  );

  lessonContent.appendChild(
    createElement(
      "h1",
      "lesson-title",
      stage.title
    )
  );

  lessonContent.appendChild(
    createElement(
      "p",
      "lesson-text",
      stage.instruction
    )
  );

  const sentenceArea =
    createElement(
      "div",
      "sentence-area"
    );

  lessonContent.appendChild(
    sentenceArea
  );

  const bank =
    createElement(
      "div",
      "word-bank"
    );

  const shuffled =
    [...stage.words]
      .sort(() => Math.random() - 0.5);

  shuffled.forEach(word => {

    const chip =
      createElement(
        "button",
        "word-chip",
        word
      );

    chip.addEventListener(
      "click",
      () => {

        if (
          chip.classList.contains("selected")
        ) {
          return;
        }

        chip.classList.add("selected");

        selectedWords.push(word);

        const selectedChip =
          createElement(
            "button",
            "word-chip selected",
            word
          );

        selectedChip.addEventListener(
          "click",
          () => {

            const index =
              selectedWords.indexOf(word);

            if (index !== -1) {
              selectedWords.splice(index, 1);
            }

            chip.classList.remove(
              "selected"
            );

            selectedChip.remove();

          }
        );

        sentenceArea.appendChild(
          selectedChip
        );

      }
    );

    bank.appendChild(chip);
  });

  lessonContent.appendChild(bank);

  const checkButton =
    createElement(
      "button",
      "next-button",
      "Check sentence ✓"
    );

  checkButton.addEventListener(
    "click",
    () => {

      const sentence =
        selectedWords.join(" ") + ".";

      if (
        sentence.toLowerCase() ===
        stage.correct.toLowerCase()
      ) {

        addXP(15);
        addGems(2);

        speak("Excellent!");

        showToast(
          "⭐ +15 XP   💎 +2 Gems"
        );

        setTimeout(
          nextStage,
          900
        );

      } else {

        speak("Try again!");

        showToast(
          "Put the words in the right order."
        );
      }
    }
  );

  lessonContent.appendChild(
    checkButton
  );
}


/* =====================================
   READING
===================================== */

function renderReading(stage) {

  lessonContent.appendChild(
    createElement(
      "div",
      "lesson-kicker",
      "Reading"
    )
  );

  lessonContent.appendChild(
    createElement(
      "h1",
      "lesson-title",
      stage.title
    )
  );

  const card =
    createElement(
      "div",
      "reading-card"
    );

  card.appendChild(
    createElement(
      "p",
      "",
      stage.text
    )
  );

  lessonContent.appendChild(card);

  const listen =
    addListenButton(
      "🔊 Listen to the story"
    );

  lessonContent.appendChild(
    listen
  );

  const readButton =
    createElement(
      "button",
      "listen-button",
      "📖 Read it yourself"
    );

  readButton.addEventListener(
    "click",
    () => {
      showToast(
        "Read the story aloud!"
      );
    }
  );

  lessonContent.appendChild(
    readButton
  );

  addNextButton(
    "I read it →"
  );
}


/* =====================================
   SPEAK
===================================== */

function renderSpeak(stage) {

  lessonContent.appendChild(
    createElement(
      "div",
      "lesson-kicker",
      "Speaking"
    )
  );

  lessonContent.appendChild(
    createElement(
      "h1",
      "lesson-title",
      stage.title
    )
  );

  if (stage.image) {

    const image =
      document.createElement("img");

    image.src =
      stage.image;

    image.style.width =
      "min(350px, 80vw)";

    image.style.height =
      "250px";

    image.style.objectFit =
      "contain";

    lessonContent.appendChild(
      image
    );
  }

  lessonContent.appendChild(
    createElement(
      "div",
      "speech-box",
      stage.text
    )
  );

  const listen =
    addListenButton(
      "🔊 Hear Lily"
    );

  lessonContent.appendChild(
    listen
  );

  if (!canRecognizeSpeech()) {

    lessonContent.appendChild(
      createElement(
        "p",
        "lesson-text",
        "Voice recognition is not available in this browser. You can repeat the sentence aloud and continue."
      )
    );

    addNextButton(
      "I said it →"
    );

    return;
  }

  const speakButton =
    createElement(
      "button",
      "next-button",
      "🎤 Say it"
    );

  speakButton.addEventListener(
    "click",
    async () => {

      speakButton.disabled =
        true;

      speakButton.textContent =
        "🎤 Listening...";

      const result =
        await recognizeSpeech();

      speakButton.disabled =
        false;

      speakButton.textContent =
        "🎤 Say it";

      if (!result.text) {

        showToast(
          "I didn't hear you. Try again."
        );

        return;
      }

      if (
        speechMatches(
          result.text,
          stage.target
        )
      ) {

        addXP(20);
        addGems(3);

        speak("Amazing! Your English is great!");

        showToast(
          "⭐ +20 XP   💎 +3 Gems"
        );

        setTimeout(
          nextStage,
          1100
        );

      } else {

        showToast(
          `I heard: "${result.text}". Try again!`
        );

        speak(
          stage.target
        );
      }

    }
  );

  lessonContent.appendChild(
    speakButton
  );
}


/* =====================================
   FINAL QUEST
===================================== */

function renderQuest(stage) {

  lessonContent.appendChild(
    createElement(
      "div",
      "lesson-kicker",
      "Final Quest"
    )
  );

  lessonContent.appendChild(
    createElement(
      "h1",
      "lesson-title",
      stage.title
    )
  );

  lessonContent.appendChild(
    createElement(
      "p",
      "lesson-text",
      stage.text
    )
  );

  const list =
    createElement(
      "div",
      "quest-list"
    );

  stage.missions.forEach(
    (mission, index) => {

      const item =
        createElement(
          "div",
          "quest-item",
          `⭐ ${index + 1}. ${mission}`
        );

      list.appendChild(item);
    }
  );

  lessonContent.appendChild(list);

  const finish =
    createElement(
      "button",
      "next-button",
      "🏆 Complete Family Quest"
    );

  finish.addEventListener(
    "click",
    completeCurrentLesson
  );

  lessonContent.appendChild(
    finish
  );
}


/* =====================================
   NEXT
===================================== */

function nextStage() {

  if (!currentLesson) {
    return;
  }

  if (
    currentStage <
    currentLesson.stages.length - 1
  ) {

    currentStage++;

    renderStage();

  } else {

    completeCurrentLesson();
  }
}


/* =====================================
   BACK
===================================== */

function goBackInLesson() {

  if (!currentLesson) {
    showMap();
    return;
  }

  if (currentStage > 0) {

    currentStage--;

    renderStage();

  } else {

    showMap();
  }
}


/* =====================================
   COMPLETE
===================================== */

function completeCurrentLesson() {

  if (!currentLesson) {
    return;
  }

  completeLesson(
    currentLesson.key
  );

  completeQuest(
    currentLesson.key + "-final"
  );

  addXP(50);
  addGems(10);

  const player =
    getPlayer();

  document.getElementById(
    "rewardTitle"
  ).textContent =
    "Family Quest Complete! 🎉";

  document.getElementById(
    "rewardText"
  ).textContent =
    "You learned family words, built sentences, read a story and practised speaking.";

  document.getElementById(
    "rewardXP"
  ).textContent =
    player.xp;

  document.getElementById(
    "rewardGems"
  ).textContent =
    player.gems;

  showScreen("reward");
}


/* =====================================
   EVENTS
===================================== */

document
  .getElementById("startQuestBtn")
  .addEventListener(
    "click",
    showMap
  );


document
  .getElementById("gamesBtn")
  .addEventListener(
    "click",
    () => {
      window.location.href =
        "games.html";
    }
  );


document
  .getElementById("mapHomeBtn")
  .addEventListener(
    "click",
    showHome
  );


document
  .getElementById("lessonBackBtn")
  .addEventListener(
    "click",
    goBackInLesson
  );


document
  .getElementById("continueBtn")
  .addEventListener(
    "click",
    showMap
  );


document
  .querySelectorAll(".zone")
  .forEach(zone => {

    zone.addEventListener(
      "click",
      () => {

        const key =
          zone.dataset.lesson;

        if (key) {
          startLesson(key);
        } else {
          showToast(
            "This adventure is coming next!"
          );
        }

      }
    );

  });


/* =====================================
   START
===================================== */

updatePlayerUI();
showScreen("home");
