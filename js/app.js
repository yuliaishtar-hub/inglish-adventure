```javascript
import familyLesson from "../lessons/family.js";

import {
  loadPlayer,
  addXP,
  addGems,
  completeLesson,
  hasCompletedLesson
} from "./player.js";

import {
  speak,
  recognizeSpeech,
  speechMatches,
  canRecognizeSpeech,
  stopSpeaking
} from "./voice.js";

const lessons = {
  family: familyLesson
};

let player = loadPlayer();

let currentLesson = null;
let currentStage = 0;

let stageAnswered = false;
let selectedWords = [];


const screens = {
  home: document.getElementById("homeScreen"),
  map: document.getElementById("mapScreen"),
  lesson: document.getElementById("lessonScreen"),
  reward: document.getElementById("rewardScreen")
};


const playerXP = document.getElementById("playerXP");
const playerGems = document.getElementById("playerGems");

const lessonTitle = document.getElementById("lessonTitle");
const lessonDescription = document.getElementById("lessonDescription");

const progressBar = document.getElementById("progressBar");
const stageContainer = document.getElementById("stageContainer");

const toast = document.getElementById("toast");

const rewardXP = document.getElementById("rewardXP");
const rewardGems = document.getElementById("rewardGems");
const rewardTitle = document.getElementById("rewardTitle");
const rewardText = document.getElementById("rewardText");


function updatePlayerUI() {
  if (playerXP) {
    playerXP.textContent = `⭐ ${player.xp} XP`;
  }

  if (playerGems) {
    playerGems.textContent = `💎 ${player.gems}`;
  }
}


function showScreen(name) {
  Object.values(screens).forEach(screen => {
    if (screen) {
      screen.classList.remove("active");
    }
  });

  if (screens[name]) {
    screens[name].classList.add("active");
  }

  updatePlayerUI();
}


function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}


function addReward(xp, gems) {
  addXP(player, xp);
  addGems(player, gems);

  player = loadPlayer();

  updatePlayerUI();

  showToast(`+${xp} XP   💎 +${gems}`);
}


function renderMap() {
  showScreen("map");
}


function startLesson(key) {
  const lesson = lessons[key];

  if (!lesson) {
    showToast("This adventure is coming next!");
    return;
  }

  currentLesson = lesson;
  currentStage = 0;
  stageAnswered = false;
  selectedWords = [];

  lessonTitle.textContent = lesson.title;
  lessonDescription.textContent = lesson.description;

  showScreen("lesson");

  renderStage();
}


function renderStage() {
  if (!currentLesson) {
    renderMap();
    return;
  }

  const stages = currentLesson.stages;
  const stage = stages[currentStage];

  if (!stage) {
    finishLesson();
    return;
  }

  stageAnswered = false;
  selectedWords = [];

  const progress =
    ((currentStage + 1) / stages.length) * 100;

  progressBar.style.width = `${progress}%`;

  stageContainer.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "stage-card";

  const label = document.createElement("div");
  label.className = "stage-label";
  label.textContent =
    `${stage.label || "Adventure"} • ${currentStage + 1}/${stages.length}`;

  wrapper.appendChild(label);

  const title = document.createElement("h2");
  title.className = "stage-title";
  title.textContent = stage.title || "";

  wrapper.appendChild(title);


  if (stage.type === "story") {
    renderStory(wrapper, stage);
  }

  if (stage.type === "vocabulary") {
    renderVocabulary(wrapper, stage);
  }

  if (stage.type === "listen") {
    renderListen(wrapper, stage);
  }

  if (stage.type === "choose") {
    renderChoose(wrapper, stage);
  }

  if (stage.type === "sentence") {
    renderSentence(wrapper, stage);
  }

  if (stage.type === "reading") {
    renderReading(wrapper, stage);
  }

  if (stage.type === "speak") {
    renderSpeak(wrapper, stage);
  }

  if (stage.type === "quest") {
    renderQuest(wrapper, stage);
  }

  stageContainer.appendChild(wrapper);
}


/* =========================
   STORY
========================= */

function renderStory(container, stage) {
  if (stage.image) {
    const image = document.createElement("img");

    image.className = "stage-image";
    image.src = stage.image;
    image.alt = stage.title || "Story image";

    container.appendChild(image);
  }

  const story = document.createElement("div");

  story.className = "story-box";
  story.textContent = stage.text || "";

  container.appendChild(story);

  addListenButton(
    container,
    stage.text || "",
    "🔊 Listen"
  );

  addNextButton(container);
}


/* =========================
   VOCABULARY
========================= */

function renderVocabulary(container, stage) {
  const text = document.createElement("p");

  text.className = "stage-text";
  text.textContent = stage.text || "";

  container.appendChild(text);

  const grid = document.createElement("div");

  grid.className = "vocab-grid";


  stage.words.forEach(item => {
    const card = document.createElement("div");

    card.className = "vocab-card";


    const image = document.createElement("img");

    image.src = item.image;
    image.alt = item.word;

    card.appendChild(image);


    const word = document.createElement("div");

    word.className = "vocab-word";
    word.textContent = item.word;

    card.appendChild(word);


    const translation = document.createElement("div");

    translation.className = "vocab-translation";
    translation.textContent = item.translation;

    card.appendChild(translation);


    const hint = document.createElement("div");

    hint.className = "vocab-hint";
    hint.textContent = "Move mouse here";

    card.appendChild(hint);


    const hearWord = () => {
      speak(item.word);

      translation.classList.add("visible");

      hint.textContent = "🔊 Listening...";
    };


    card.addEventListener(
      "mouseenter",
      hearWord
    );


    card.addEventListener(
      "mouseleave",
      () => {
        hint.textContent = "Move mouse here";
      }
    );


    card.addEventListener(
      "click",
      hearWord
    );


    grid.appendChild(card);
  });


  container.appendChild(grid);

  addNextButton(container);
}


/* =========================
   LISTEN
========================= */

function renderListen(container, stage) {

  const instruction = document.createElement("p");

  instruction.className = "stage-text";

  instruction.textContent =
    "Listen carefully. Then choose the sentence you heard.";

  container.appendChild(instruction);


  const listenButton = document.createElement("button");

  listenButton.className = "listen-btn";

  listenButton.textContent =
    "🔊 Listen";

  listenButton.addEventListener(
    "click",
    () => {
      speak(stage.sentence || "");
    }
  );

  container.appendChild(listenButton);


  const sentenceBox = document.createElement("div");

  sentenceBox.className =
    "listen-sentence-box";

  sentenceBox.textContent =
    "❓ What did you hear?";

  container.appendChild(sentenceBox);


  const translation = document.createElement("div");

  translation.className =
    "listen-translation";

  translation.textContent =
    "Наведи мышку на вариант, чтобы услышать его.";

  container.appendChild(translation);


  const options = [
    {
      text: "This is my grandma.",
      translation: "Это моя бабушка."
    },
    {
      text: "This is my mummy.",
      translation: "Это моя мама."
    },
    {
      text: "This is my sister.",
      translation: "Это моя сестра."
    }
  ];


  const choices = document.createElement("div");

  choices.className =
    "listen-choices";


  const feedback = document.createElement("div");

  feedback.className =
    "feedback";


  options.forEach(option => {

    const button =
      document.createElement("button");

    button.className =
      "listen-choice-btn";

    button.textContent =
      option.text;


    button.addEventListener(
      "mouseenter",
      () => {
        speak(option.text);

        translation.textContent =
          option.translation;
      }
    );


    button.addEventListener(
      "click",
      () => {

        if (stageAnswered) {
          return;
        }


        if (option.text === stage.sentence) {

          stageAnswered = true;

          button.classList.add(
            "correct"
          );

          feedback.textContent =
            "🎉 Excellent! You heard it correctly.";

          speak(
            "Excellent! You heard it correctly."
          );

          addReward(15, 2);

          disableButtons(choices);

          addNextButton(container);

        } else {

          button.classList.add(
            "wrong"
          );

          feedback.textContent =
            "Not quite. Listen again and try.";

          speak(
            "Not quite. Listen again."
          );

          setTimeout(() => {
            button.classList.remove(
              "wrong"
            );
          }, 700);
        }
      }
    );


    choices.appendChild(button);
  });


  container.appendChild(choices);
  container.appendChild(feedback);


  const repeat = document.createElement("p");

  repeat.className =
    "stage-text";

  repeat.textContent =
    "You can listen as many times as you need.";

  container.appendChild(repeat);
}


/* =========================
   CHOOSE
========================= */

function renderChoose(container, stage) {

  if (stage.image) {

    const image =
      document.createElement("img");

    image.className =
      "stage-image";

    image.src =
      stage.image;

    image.alt =
      stage.question ||
      "Question image";

    container.appendChild(image);
  }


  if (stage.question) {

    const question =
      document.createElement("p");

    question.className =
      "stage-text";

    question.textContent =
      stage.question;

    container.appendChild(question);
  }


  const choices =
    document.createElement("div");

  choices.className =
    "choices";


  const feedback =
    document.createElement("div");

  feedback.className =
    "feedback";


  stage.options.forEach(option => {

    const button =
      document.createElement("button");

    button.className =
      "choice-btn";

    button.textContent =
      option;


    button.addEventListener(
      "mouseenter",
      () => {
        speak(option);
      }
    );


    button.addEventListener(
      "click",
      () => {

        if (stageAnswered) {
          return;
        }


        if (option === stage.answer) {

          stageAnswered = true;

          button.classList.add(
            "correct"
          );

          feedback.textContent =
            stage.success ||
            "Correct!";

          speak(
            stage.success ||
            "Correct!"
          );

          addReward(10, 1);

          disableButtons(choices);

          addNextButton(container);

        } else {

          button.classList.add(
            "wrong"
          );

          feedback.textContent =
            "Not quite. Try again!";

          speak(
            "Try again!"
          );

          setTimeout(() => {
            button.classList.remove(
              "wrong"
            );
          }, 700);
        }
      }
    );


    choices.appendChild(button);
  });


  container.appendChild(choices);
  container.appendChild(feedback);
}


/* =========================
   SENTENCE BUILDER
========================= */

function renderSentence(container, stage) {

  const text =
    document.createElement("p");

  text.className =
    "stage-text";

  text.textContent =
    stage.text || "";

  container.appendChild(text);


  const area =
    document.createElement("div");

  area.className =
    "sentence-area";


  const selected =
    document.createElement("div");

  selected.className =
    "selected-words";

  selected.textContent =
    "Build your sentence...";

  area.appendChild(selected);


  const bank =
    document.createElement("div");

  bank.className =
    "word-bank";


  const shuffled =
    [...stage.words].sort(
      () => Math.random() - 0.5
    );


  shuffled.forEach(word => {

    const button =
      document.createElement("button");

    button.className =
      "word-btn";

    button.textContent =
      word;


    button.addEventListener(
      "mouseenter",
      () => {
        speak(
          word.replace(
            /[.!?]/g,
            ""
          )
        );
      }
    );


    button.addEventListener(
      "click",
      () => {

        if (stageAnswered) {
          return;
        }


        if (
          selectedWords.includes(word)
        ) {
          return;
        }


        selectedWords.push(word);

        button.classList.add(
          "selected"
        );


        renderSelectedWords(
          selected,
          stage,
          bank,
          container
        );
      }
    );


    bank.appendChild(button);
  });


  area.appendChild(bank);

  container.appendChild(area);
}


function renderSelectedWords(
  selected,
  stage,
  bank,
  container
) {

  selected.innerHTML = "";


  if (!selectedWords.length) {

    selected.textContent =
      "Build your sentence...";

    return;
  }


  selectedWords.forEach(
    (word, index) => {

      const button =
        document.createElement("button");

      button.className =
        "word-btn";

      button.textContent =
        word;


      button.addEventListener(
        "mouseenter",
        () => {
          speak(
            word.replace(
              /[.!?]/g,
              ""
            )
          );
        }
      );


      button.addEventListener(
        "click",
        () => {

          if (stageAnswered) {
            return;
          }


          selectedWords.splice(
            index,
            1
          );


          const buttons =
            bank.querySelectorAll(
              ".word-btn"
            );


          buttons.forEach(item => {

            if (
              item.textContent === word
            ) {

              item.classList.remove(
                "selected"
              );
            }
          });


          renderSelectedWords(
            selected,
            stage,
            bank,
            container
          );
        }
      );


      selected.appendChild(button);
    }
  );


  if (
    selectedWords.length ===
    stage.words.length
  ) {

    const checkButton =
      document.createElement("button");

    checkButton.className =
      "primary-btn next-btn";

    checkButton.textContent =
      "Check sentence ✓";


    checkButton.addEventListener(
      "click",
      () => {

        const result =
          selectedWords.join(" ");


        if (
          result === stage.target
        ) {

          stageAnswered = true;

          speak(
            "Excellent!"
          );

          addReward(
            15,
            2
          );


          selected.innerHTML =
            "";

          selected.textContent =
            `✓ ${stage.target}`;


          selected.style.borderColor =
            "var(--green)";


          addNextButton(
            container
          );

        } else {

          speak(
            "Try again!"
          );

          showToast(
            "Almost! Try another order."
          );
        }
      }
    );


    selected.appendChild(
      checkButton
    );
  }
}


/* =========================
   READING
========================= */

function renderReading(
  container,
  stage
) {

  const reading =
    document.createElement("div");

  reading.className =
    "reading-text";

  reading.textContent =
    stage.reading || "";

  container.appendChild(
    reading
  );


  addListenButton(
    container,
    stage.reading || "",
    "🔊 Listen to the story"
  );


  const instruction =
    document.createElement("p");

  instruction.className =
    "stage-text";

  instruction.textContent =
    "Read it once by yourself, then listen.";

  container.appendChild(
    instruction
  );


  addNextButton(
    container
  );
}


/* =========================
   SPEAK
========================= */

function renderSpeak(
  container,
  stage
) {

  const box =
    document.createElement("div");

  box.className =
    "speak-box";


  const text =
    document.createElement("p");

  text.className =
    "stage-text";

  text.textContent =
    stage.text || "";

  box.appendChild(
    text
  );


  const target =
    document.createElement("div");

  target.className =
    "target-sentence";

  target.textContent =
    stage.target || "";

  box.appendChild(
    target
  );


  addListenButton(
    box,
    stage.target || "",
    "🔊 Hear the sentence"
  );


  const mic =
    document.createElement("button");

  mic.className =
    "mic-btn";

  mic.textContent =
    "🎤";

  mic.title =
    "Speak";


  box.appendChild(
    mic
  );


  const feedback =
    document.createElement("div");

  feedback.className =
    "feedback";

  box.appendChild(
    feedback
  );


  mic.addEventListener(
    "click",
    async () => {

      if (stageAnswered) {
        return;
      }


      mic.disabled = true;


      if (!canRecognizeSpeech()) {

        feedback.textContent =
          "Your browser cannot hear speech here. Read the sentence aloud, then continue.";

        stageAnswered = true;

        addReward(
          20,
          3
        );

        addNextButton(
          box
        );

        mic.disabled = false;

        return;
      }


      feedback.textContent =
        "🎤 Listening...";


      const result =
        await recognizeSpeech();


      mic.disabled = false;


      if (!result.text) {

        feedback.textContent =
          "I didn't hear you. Try once more.";

        return;
      }


      if (
        speechMatches(
          result.text,
          stage.target
        )
      ) {

        stageAnswered = true;

        feedback.textContent =
          `✓ I heard: "${result.text}"`;

        speak(
          "Excellent speaking!"
        );

        addReward(
          20,
          3
        );

        addNextButton(
          box
        );

      } else {

        feedback.textContent =
          `I heard: "${result.text}". Try again!`;

        speak(
          stage.target
        );
      }
    }
  );


  container.appendChild(
    box
  );
}


/* =========================
   FINAL QUEST
========================= */

function renderQuest(
  container,
  stage
) {

  const text =
    document.createElement("p");

  text.className =
    "stage-text";

  text.textContent =
    stage.text || "";

  container.appendChild(
    text
  );


  const list =
    document.createElement("div");

  list.className =
    "quest-list";


  stage.missions.forEach(
    (mission, index) => {

      const item =
        document.createElement("div");

      item.className =
        "quest-item";

      item.textContent =
        `⭐ Mission ${index + 1}: ${mission}`;


      item.addEventListener(
        "mouseenter",
        () => {
          speak(mission);
        }
      );


      list.appendChild(
        item
      );
    }
  );


  container.appendChild(
    list
  );


  const reward =
    document.createElement("div");

  reward.className =
    "story-box";

  reward.textContent =
    stage.reward || "";

  container.appendChild(
    reward
  );


  const button =
    document.createElement("button");

  button.className =
    "primary-btn next-btn";

  button.textContent =
    "Complete Family Quest 🎉";


  button.addEventListener(
    "click",
    finishLesson
  );


  container.appendChild(
    button
  );
}


/* =========================
   AUDIO
========================= */

function addListenButton(
  container,
  text,
  label
) {

  const button =
    document.createElement("button");

  button.className =
    "listen-btn";

  button.textContent =
    label;


  button.addEventListener(
    "click",
    () => {
      speak(text);
    }
  );


  container.appendChild(
    button
  );
}


/* =========================
   BUTTONS
========================= */

function addNextButton(
  container
) {

  const button =
    document.createElement("button");

  button.className =
    "primary-btn next-btn";

  button.textContent =
    currentStage <
    currentLesson.stages.length - 1
      ? "Next →"
      : "Finish 🎉";


  button.addEventListener(
    "click",
    nextStage
  );


  container.appendChild(
    button
  );
}


function disableButtons(
  parent
) {

  parent
    .querySelectorAll("button")
    .forEach(
      button => {
        button.disabled = true;
      }
    );
}


/* =========================
   NAVIGATION
========================= */

function nextStage() {

  stopSpeaking();


  if (
    currentStage <
    currentLesson.stages.length - 1
  ) {

    currentStage++;

    renderStage();

  } else {

    finishLesson();
  }
}


function finishLesson() {

  stopSpeaking();


  if (!currentLesson) {

    renderMap();

    return;
  }


  const wasCompleted =
    hasCompletedLesson(
      player,
      currentLesson.key
    );


  if (!wasCompleted) {

    completeLesson(
      player,
      currentLesson.key
    );


    addXP(
      player,
      50
    );


    addGems(
      player,
      10
    );


    player =
      loadPlayer();
  }


  rewardTitle.textContent =
    `${currentLesson.title} Complete! 🎉`;


  rewardText.textContent =
    wasCompleted
      ? "You have already completed this adventure. You can play it again whenever you want."
      : "Amazing work! You finished the whole Family Adventure.";


  rewardXP.textContent =
    wasCompleted
      ? "⭐ Already completed"
      : "⭐ +50 XP";


  rewardGems.textContent =
    wasCompleted
      ? "💎 Adventure complete"
      : "💎 +10 Gems";


  showScreen(
    "reward"
  );
}


function goBackFromLesson() {

  stopSpeaking();


  if (
    currentStage > 0
  ) {

    currentStage--;

    renderStage();

    return;
  }


  renderMap();
}


/* =========================
   MAIN NAVIGATION
========================= */

const startQuestButton =
  document.getElementById(
    "startQuest"
  );


if (startQuestButton) {

  startQuestButton.addEventListener(
    "click",
    () => {
      renderMap();
    }
  );
}


const gamesButton =
  document.getElementById(
    "gamesBtn"
  );


if (gamesButton) {

  gamesButton.addEventListener(
    "click",
    () => {
      window.location.href =
        "games.html";
    }
  );
}


document
  .querySelectorAll(
    "[data-lesson]"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const key =
            button.dataset.lesson;


          if (lessons[key]) {

            startLesson(
              key
            );

          } else {

            showToast(
              "This adventure is coming next!"
            );
          }
        }
      );
    }
  );


const mapHomeButton =
  document.getElementById(
    "mapHome"
  );


if (mapHomeButton) {

  mapHomeButton.addEventListener(
    "click",
    () => {
      showScreen("home");
    }
  );
}


const lessonBackButton =
  document.getElementById(
    "lessonBack"
  );


if (lessonBackButton) {

  lessonBackButton.addEventListener(
    "click",
    goBackFromLesson
  );
}


const rewardMapButton =
  document.getElementById(
    "rewardMap"
  );


if (rewardMapButton) {

  rewardMapButton.addEventListener(
    "click",
    () => {
      renderMap();
    }
  );
}


const rewardHomeButton =
  document.getElementById(
    "rewardHome"
  );


if (rewardHomeButton) {

  rewardHomeButton.addEventListener(
    "click",
    () => {
      showScreen("home");
    }
  );
}


updatePlayerUI();

showScreen("home");
```
