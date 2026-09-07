const STORAGE_KEY = "english_adventure_player_v3";

const defaultPlayer = {
  name: "Lily's Friend",
  xp: 0,
  gems: 0,
  completedLessons: [],
  completedQuests: [],
  inventory: []
};

function loadPlayer() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...defaultPlayer };
    }

    return {
      ...defaultPlayer,
      ...JSON.parse(saved)
    };

  } catch (error) {
    console.error("Could not load player:", error);
    return { ...defaultPlayer };
  }
}

let player = loadPlayer();

function savePlayer() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(player)
  );
}

function addXP(amount) {
  player.xp += amount;
  savePlayer();
}

function addGems(amount) {
  player.gems += amount;
  savePlayer();
}

function completeLesson(key) {
  if (!player.completedLessons.includes(key)) {
    player.completedLessons.push(key);
    savePlayer();
  }
}

function completeQuest(key) {
  if (!player.completedQuests.includes(key)) {
    player.completedQuests.push(key);
    savePlayer();
  }
}

function hasCompletedLesson(key) {
  return player.completedLessons.includes(key);
}

function hasCompletedQuest(key) {
  return player.completedQuests.includes(key);
}

function getPlayer() {
  return player;
}

export {
  loadPlayer,
  savePlayer,
  addXP,
  addGems,
  completeLesson,
  completeQuest,
  hasCompletedLesson,
  hasCompletedQuest,
  getPlayer
};
