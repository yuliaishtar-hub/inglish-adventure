const STORAGE_KEY = "english_adventure_player_v3";

const defaultPlayer = {
  name: "Lily's Friend",
  xp: 0,
  gems: 0,
  completedLessons: [],
  completedQuests: [],
  inventory: []
};

export function loadPlayer() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...defaultPlayer };
    }

    const parsed = JSON.parse(saved);

    return {
      ...defaultPlayer,
      ...parsed
    };
  } catch (error) {
    console.error("Could not load player:", error);
    return { ...defaultPlayer };
  }
}

export function savePlayer(player) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
}

export function addXP(player, amount) {
  player.xp += amount;
  savePlayer(player);
  return player;
}

export function addGems(player, amount) {
  player.gems += amount;
  savePlayer(player);
  return player;
}

export function completeLesson(player, lessonKey) {
  if (!player.completedLessons.includes(lessonKey)) {
    player.completedLessons.push(lessonKey);
    savePlayer(player);
    return true;
  }

  return false;
}

export function completeQuest(player, questKey) {
  if (!player.completedQuests.includes(questKey)) {
    player.completedQuests.push(questKey);
    savePlayer(player);
    return true;
  }

  return false;
}

export function hasCompletedLesson(player, lessonKey) {
  return player.completedLessons.includes(lessonKey);
}

export function hasCompletedQuest(player, questKey) {
  return player.completedQuests.includes(questKey);
}

export function getPlayer() {
  return loadPlayer();
}
