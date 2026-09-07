let selectedVoice = null;

function findBestVoice() {
  if (!("speechSynthesis" in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();

  if (!voices.length) {
    return null;
  }

  const preferredNames = [
    "Samantha",
    "Karen",
    "Google US English",
    "Microsoft Jenny Online",
    "Microsoft Aria Online",
    "Microsoft Jenny",
    "Microsoft Aria"
  ];

  for (const preferred of preferredNames) {
    const found = voices.find(voice =>
      voice.name.toLowerCase().includes(preferred.toLowerCase())
    );

    if (found) {
      return found;
    }
  }

  return (
    voices.find(voice => voice.lang === "en-US") ||
    voices.find(voice => voice.lang.startsWith("en")) ||
    voices[0]
  );
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    selectedVoice = findBestVoice();
  };

  selectedVoice = findBestVoice();
}

export function speak(
  text,
  {
    lang = "en-US",
    rate = 0.78,
    pitch = 1.08,
    volume = 1
  } = {}
) {
  if (!("speechSynthesis" in window)) {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  utterance.lang = lang;
  utterance.rate = rate;
  utterance.pitch = pitch;
  utterance.volume = volume;

  const voice = selectedVoice || findBestVoice();

  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export function canRecognizeSpeech() {
  return Boolean(
    window.SpeechRecognition ||
    window.webkitSpeechRecognition
  );
}

export function recognizeSpeech() {
  return new Promise(resolve => {
    const Recognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!Recognition) {
      resolve({
        supported: false,
        text: ""
      });

      return;
    }

    const recognition = new Recognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = event => {
      const text =
        event.results?.[0]?.[0]?.transcript || "";

      resolve({
        supported: true,
        text
      });
    };

    recognition.onerror = () => {
      resolve({
        supported: true,
        text: ""
      });
    };

    recognition.onend = () => {
      // The result handler normally resolves first.
    };

    recognition.start();
  });
}

export function normalizeSpeech(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[.,!?'"’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function speechMatches(spoken, target) {
  const spokenWords = normalizeSpeech(spoken)
    .split(" ")
    .filter(Boolean);

  const targetWords = normalizeSpeech(target)
    .split(" ")
    .filter(Boolean);

  if (!spokenWords.length || !targetWords.length) {
    return false;
  }

  let matches = 0;

  for (const word of targetWords) {
    if (spokenWords.includes(word)) {
      matches++;
    }
  }

  const ratio = matches / targetWords.length;

  return ratio >= 0.7;
}
