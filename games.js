<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>English Adventure</title>
    <link rel="stylesheet" href="style.css?v=5">
</head>
<body>
    <div id="game-container">
        <!-- Экран Приветствия -->
        <div id="welcome-screen">
            <h1>English Adventure</h1>
            <img id="welcome-lily" src="https://yuliaishtar-hub.github.io/inglish-adventure/Lili.jpg" alt="Lily">
            <div id="welcome-text">Hi! I'm Lily! Let's go on an adventure!</div>
            <button class="location-btn" onclick="showMap()">Start 🚀</button>
        </div>

        <!-- Экран Карты -->
        <div id="map-screen" style="display: none;">
            <h1>🗺️ Map</h1>
            <img id="map-lily" src="https://yuliaishtar-hub.github.io/inglish-adventure/Lili.jpg" alt="Lily">
            
            <button class="location-btn" onclick="startLevel('school')">🏫 School Days</button>
            <button class="location-btn gold" onclick="startGames('school')">🎮 School Game</button>
            <button class="location-btn" onclick="startLevel('animals')">🐾 Animals</button>
            <button class="location-btn gold" onclick="startGames('animals')">🎮 Animals Game</button>
            <button class="location-btn" onclick="startLevel('family')">👨‍👩‍👧 Family</button>
            <button class="location-btn gold" onclick="startGames('family')">🎮 Family Game</button>
            <button class="location-btn" onclick="startLevel('seasons')">🌦️ Seasons</button>
            <button class="location-btn gold" onclick="startGames('seasons')">🎮 Seasons Game</button>
            <button class="location-btn" onclick="startLevel('colours')">🎨 Colours</button>
            <button class="location-btn gold" onclick="startGames('colours')">🎮 Colours Game</button>
            <button class="location-btn" onclick="startLevel('circus')">🤡 Circus</button>
            <button class="location-btn gold" onclick="startGames('circus')">🎮 Circus Game</button>
            <button class="location-btn" onclick="startLevel('toys')">🧸 Toys</button>
            <button class="location-btn gold" onclick="startGames('toys')">🎮 Toys Game</button>
            <button class="location-btn" onclick="startLevel('home')">🏡 Home</button>
            <button class="location-btn gold" onclick="startGames('home')">🎮 Home Game</button>
            <button class="location-btn" onclick="startLevel('food')">🍕 Food & Drinks</button>
            <button class="location-btn gold" onclick="startGames('food')">🎮 Food Game</button>
            <button class="location-btn" onclick="startLevel('body')">💪 Body</button>
            <button class="location-btn gold" onclick="startGames('body')">🎮 Body Game</button>
            <button class="location-btn" onclick="startLevel('clothes')">👗 Clothes</button>
            <button class="location-btn gold" onclick="startGames('clothes')">🎮 Clothes Game</button>
        </div>

        <!-- Экран Локации -->
        <div id="game-screen" style="display: none;">
            <div id="top-bar">
                <button class="nav-btn" onclick="goBackToMap()">⬅️ Map</button>
                <button class="nav-btn" onclick="window.location.reload()">🔄 Restart</button>
            </div>
            
            <h2 id="level-title">Level</h2>
            <div id="lily-img">
                <img src="https://yuliaishtar-hub.github.io/inglish-adventure/Lili.jpg" alt="Lily">
            </div>
            
            <div id="xp-bar"><div id="xp-fill"></div></div>
            <div id="crystal-count">💎 <span id="crystals">0</span></div>
            
            <div id="question-text">Loading...</div>
            <div id="question-image"></div>
            <div id="answers"></div>
            <div id="feedback"></div>
            
            <button id="mic-btn" onclick="startListening()">🎤 Say it!</button>
            <button id="next-btn" onclick="nextQuestion()">Next ➡️</button>
        </div>

        <!-- Экран Мини-игры -->
        <div id="mini-game-screen" style="display: none;">
            <h2 id="mini-game-title">Mini Game</h2>
            <div id="mini-game-content"></div>
            <div id="mini-game-result"></div>
            <button id="exit-mini-game-btn" onclick="exitMiniGame()">Back to Map</button>
        </div>
    </div>

    <script src="games.js"></script>

    <script>
        // ---------- GAME DATA ----------
        let xp = 0;
        let crystals = 0;
        let currentLevelIndex = 0;
        let currentQuestion = {};
        let correctAnswerText = "";
        let currentLevelQuestions = [];
        let currentLevelName = "";

        // Настройки голоса
        let lilyVoice = null;
        const LILY_PITCH = 1.2;
        const LILY_RATE = 0.85;

        // Все вопросы по школьной программе
        const allLevels = {
            school: {
                name: "🏫 School Days",
                questions: [
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/pen.jpg", options: ["It's a pen.", "It's a ruler.", "It's an eraser."], correctIndex: 0 },
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/pencil.jpg", options: ["It's a pencil.", "It's a ruler.", "It's a pen."], correctIndex: 0 },
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/ruler.jpg", options: ["It's a pencil.", "It's a ruler.", "It's a pen."], correctIndex: 1 },
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/Eraser.jpg", options: ["It's a ruler.", "It's a pen.", "It's an eraser."], correctIndex: 2 },
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/School bag.jpg", options: ["It's a school bag.", "It's a pen.", "It's a ruler."], correctIndex: 0 }
                ]
            },
            animals: {
                name: "🐾 Animals",
                questions: [
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/monkey.jpg", options: ["It's a chimp.", "It's a fish.", "It's a bird."], correctIndex: 0 },
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/fish.jpg", options: ["It's a mouse.", "It's a frog.", "It's a fish."], correctIndex: 2 },
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/bird.jpg", options: ["It's a bird.", "It's a chimp.", "It's a mouse."], correctIndex: 0 },
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/mouse.jpg", options: ["It's a fish.", "It's a mouse.", "It's a frog."], correctIndex: 1 },
                    { question: "What is it?", image: "https://yuliaishtar-hub.github.io/inglish-adventure/frog.jpg", options: ["It's a frog.", "It's a bird.", "It's a chimp."], correctIndex: 0 }
                ]
            },
            family: {
                name: "👨‍👩‍👧 Family",
                questions: [
                    { question: "Who is she?", image: "👩", options: ["She's my mum.", "She's my sister.", "She's my grandma."], correctIndex: 0 },
                    { question: "Who is he?", image: "👴", options: ["He's my brother.", "He's my grandpa.", "He's my dad."], correctIndex: 1 },
                    { question: "Who is he?", image: "👨", options: ["He's my daddy.", "He's my grandpa.", "He's my brother."], correctIndex: 0 },
                    { question: "Who is she?", image: "👧", options: ["She's my mummy.", "She's my grandma.", "She's my sister."], correctIndex: 2 }
                ]
            },
            seasons: {
                name: "🌦️ Seasons",
                questions: [
                    { question: "What season is it?", image: "❄️", options: ["It's winter.", "It's summer.", "It's spring."], correctIndex: 0 },
                    { question: "What season is it?", image: "🌸", options: ["It's autumn.", "It's spring.", "It's winter."], correctIndex: 1 },
                    { question: "What season is it?", image: "☀️", options: ["It's winter.", "It's spring.", "It's summer."], correctIndex: 2 },
                    { question: "What season is it?", image: "🍂", options: ["It's autumn.", "It's winter.", "It's summer."], correctIndex: 0 }
                ]
            },
            colours: {
                name: "🎨 Colours",
                questions: [
                    { question: "What colour is it?", image: "🔴", options: ["It's red.", "It's blue.", "It's white."], correctIndex: 0 },
                    { question: "What colour is it?", image: "🔵", options: ["It's yellow.", "It's black.", "It's blue."], correctIndex: 2 },
                    { question: "What colour is it?", image: "🟡", options: ["It's yellow.", "It's brown.", "It's orange."], correctIndex: 0 },
                    { question: "What colour is it?", image: "⚫", options: ["It's white.", "It's black.", "It's red."], correctIndex: 1 }
                ]
            },
            circus: {
                name: "🤡 Circus",
                questions: [
                    { question: "Who is he?", image: "🤡", options: ["He's a clown.", "He's a magician.", "He's a clown."], correctIndex: 0 },
                    { question: "Who is he?", image: "🧙‍♂️", options: ["He's a magician.", "He's a clown.", "He's a clown."], correctIndex: 0 }
                ]
            },
            toys: {
                name: "🧸 Toys",
                questions: [
                    { question: "What is it?", image: "🧸", options: ["It's a teddy bear.", "It's a doll.", "It's a ball."], correctIndex: 0 },
                    { question: "What is it?", image: "🪀", options: ["It's a yoyo.", "It's a puppet.", "It's a toy soldier."], correctIndex: 0 },
                    { question: "What is it?", image: "⚽", options: ["It's a ball.", "It's a teddy bear.", "It's a doll."], correctIndex: 0 },
                    { question: "What is it?", image: "🪆", options: ["It's a puppet.", "It's a yoyo.", "It's a ball."], correctIndex: 0 }
                ]
            },
            home: {
                name: "🏡 Home",
                questions: [
                    { question: "What is it?", image: "🪑", options: ["It's a chair.", "It's a table.", "It's a shelf."], correctIndex: 0 },
                    { question: "What is it?", image: "🛏️", options: ["It's a kitchen.", "It's a bedroom.", "It's a bathroom."], correctIndex: 1 },
                    { question: "What is it?", image: "🍳", options: ["It's a kitchen.", "It's a living room.", "It's a bedroom."], correctIndex: 0 },
                    { question: "What is it?", image: "🚽", options: ["It's a bedroom.", "It's a bathroom.", "It's a kitchen."], correctIndex: 1 }
                ]
            },
            food: {
                name: "🍕 Food & Drinks",
                questions: [
                    { question: "What is it?", image: "🍕", options: ["It's pizza.", "It's a burger.", "It's ice cream."], correctIndex: 0 },
                    { question: "What is it?", image: "🍔", options: ["It's pizza.", "It's a burger.", "It's chips."], correctIndex: 1 },
                    { question: "What is it?", image: "🧃", options: ["It's orange juice.", "It's water.", "It's milk."], correctIndex: 0 },
                    { question: "What is it?", image: "🍎", options: ["It's a banana.", "It's an apple.", "It's a cake."], correctIndex: 1 }
                ]
            },
            body: {
                name: "💪 Body",
                questions: [
                    { question: "What is it?", image: "👁️", options: ["It's an eye.", "It's an ear.", "It's a mouth."], correctIndex: 0 },
                    { question: "What is it?", image: "👂", options: ["It's a nose.", "It's a mouth.", "It's an ear."], correctIndex: 2 },
                    { question: "What is it?", image: "👋", options: ["It's a hand.", "It's a foot.", "It's an eye."], correctIndex: 0 },
                    { question: "What is it?", image: "🦶", options: ["It's a hand.", "It's a foot.", "It's a mouth."], correctIndex: 1 }
                ]
            },
            clothes: {
                name: "👗 Clothes",
                questions: [
                    { question: "What is it?", image: "🧦", options: ["It's socks.", "It's shoes.", "It's a hat."], correctIndex: 0 },
                    { question: "What is it?", image: "👟", options: ["It's jeans.", "It's shoes.", "It's a jacket."], correctIndex: 1 },
                    { question: "What is it?", image: "👖", options: ["It's shorts.", "It's a skirt.", "It's jeans."], correctIndex: 2 },
                    { question: "What is it?", image: "👗", options: ["It's a skirt.", "It's a coat.", "It's a jacket."], correctIndex: 0 }
                ]
            }
        };

        // ---------- INITIALIZATION ----------
        window.onload = function() {
            loadProgress();
            setupVoice();
            speakText("Hi! I'm Lily! Let's go on an adventure!", true);
        };

        function loadProgress() {
            if (localStorage.getItem('xp')) xp = parseInt(localStorage.getItem('xp'));
            if (localStorage.getItem('crystals')) crystals = parseInt(localStorage.getItem('crystals'));
            updateUI();
        }

        function saveProgress() {
            localStorage.setItem('xp', xp);
            localStorage.setItem('crystals', crystals);
        }

        function updateUI() {
            document.getElementById('xp-fill').style.width = (xp % 100) + '%';
            document.getElementById('crystals').innerText = crystals;
        }

        // ---------- VOICE SETUP ----------
        function setupVoice() {
            const voices = window.speechSynthesis.getVoices();
            
            for (let i =  < 0; i < voices.length; i++) {
                const v = voices[i];
                if (v.name.includes('Google UK English Female') || 
                    v.name.includes('Zira') || 
                    v.name.includes('Samantha') || 
                    v.name.includes('Female') ||
                    v.lang === 'en-US' || 
                    v.lang === 'en-GB') {
                    lilyVoice = v;
                    break;
                }
            }
            
            if (!lilyVoice && voices.length > 0) {
                lilyVoice = voices[0];
            }
            
            window.speechSynthesis.onvoiceschanged = function() {
                const voices = window.speechSynthesis.getVoices();
                for (let i = 0; i < voices.length; i++) {
                    const v = voices[i];
                    if (v.name.includes('Google UK English Female') || 
                        v.name.includes('Zira') || 
                        v.name.includes('Samantha') || 
                        v.name.includes('Female') ||
                        v.lang === 'en-US' || 
                        v.lang === 'en-GB') {
                        lilyVoice = v;
                        break;
                    }
                }
            };
        }

        function speakText(text, slow = false) {
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = slow ? LILY_RATE : 1.0;
            utterance.pitch = LILY_PITCH;
            utterance.volume = 1.0;
            
            if (lilyVoice) {
                utterance.voice = lilyVoice;
            }
            
            window.speechSynthesis.speak(utterance);
        }

        // ---------- WELCOME & MAP ----------
        function showMap() {
            speakText("Let's go on an adventure!", true);
            
            document.getElementById('welcome-screen').style.display = 'none';
            document.getElementById('map-screen').style.display = 'block';
            document.getElementById('game-screen').style.display = 'none';
            document.getElementById('mini-game-screen').style.display = 'none';
        }

        function startLevel(levelKey) {
            currentLevelQuestions = allLevels[levelKey].questions;
            currentLevelName = allLevels[levelKey].name;
            document.getElementById('level-title').innerText = currentLevelName;
            
            speakText(currentLevelName.replace(/[^\w\s]/g, ''), true);
            
            document.getElementById('map-screen').style.display = 'none';
            document.getElementById('game-screen').style.display = 'block';
            document.getElementById('mini-game-screen').style.display = 'none';
            
            currentLevelIndex = 0;
            loadQuestion();
            updateUI();
        }

        function goBackToMap() {
            showMap();
            window.speechSynthesis.cancel();
        }

        // ---------- QUESTION LOGIC ----------
        function loadQuestion() {
            if (currentLevelIndex >= currentLevelQuestions.length) {
                showReviewScreen();
                return;
            }
            
            currentQuestion = currentLevelQuestions[currentLevelIndex];
            correctAnswerText = currentQuestion.options[currentQuestion.correctIndex];

            document.getElementById('question-text').innerHTML = currentQuestion.question;
            document.getElementById('question-image').innerHTML = "";
            document.getElementById('feedback').innerText = "";
            document.getElementById('mic-btn').style.display = 'none';
            document.getElementById('next-btn').style.display = 'none';

            // Вставляем картинку вопроса
            if (typeof currentQuestion.image === 'string' && currentQuestion.image.startsWith('http')) {
                document.getElementById('question-image').innerHTML = '<img src="' + currentQuestion.image + '" style="width: 120px; border-radius: 10px;">';
            } else {
                document.getElementById('question-image').innerHTML = currentQuestion.image;
            }

            const answersDiv = document.getElementById('answers');
            answersDiv.innerHTML = "";

            currentQuestion.options.forEach((option, index) => {
                const btn = document.createElement('button');
                btn.innerText = option;
                btn.className = 'answer-btn';
                btn.onclick = () => selectAnswer(index, btn);
                answersDiv.appendChild(btn);
            });
        }

        function selectAnswer(index, btn) {
            const buttons = document.querySelectorAll('.answer-btn');
            
            if (index === currentQuestion.correctIndex) {
                buttons.forEach(b => b.disabled = true);
                btn.classList.add('correct');
                document.getElementById('feedback').innerHTML = "Great! Now say it aloud!";
                document.getElementById('feedback').style.color = '#4CAF50';
                
                document.getElementById('mic-btn').style.display = 'inline-block';
                document.getElementById('next-btn').style.display = 'inline-block';
                
                speakText(correctAnswerText, true);
            } else {
                btn.classList.add('wrong');
                btn.disabled = true;
                document.getElementById('feedback').innerHTML = "Oops! Try again!";
                document.getElementById('feedback').style.color = '#f44336';
            }
        }

        // ---------- VOICE LOGIC ----------
        function startListening() {
            const micBtn = document.getElementById('mic-btn');
            micBtn.classList.add('active');
            micBtn.innerText = "Listening...";

            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onresult = (event) => {
                const spokenText = event.results[0][0].transcript.toLowerCase();
                const cleanSpoken = spokenText.trim().replace(/[.,!?;:]/g, '');
                const cleanCorrect = correctAnswerText.toLowerCase().replace(/[.,!?;:]/g, '');

                if (cleanSpoken.includes(cleanCorrect) || cleanCorrect.includes(cleanSpoken)) {
                    xp += 10;
                    crystals += 1;
                    saveProgress();
                    updateUI();
                    
                    micBtn.classList.remove('active');
                    micBtn.style.display = 'none';
                    document.getElementById('feedback').innerHTML = "Excellent! +10 XP!";
                    document.getElementById('feedback').style.color = '#4CAF50';
                    document.getElementById('next-btn').style.display = 'inline-block';
                } else {
                    micBtn.classList.remove('active');
                    micBtn.innerText = "🎤 Try Again";
                    document.getElementById('feedback').innerHTML = "Not quite. Listen to Lily and try again!";
                    document.getElementById('feedback').style.color = '#f44336';
                    speakText(correctAnswerText, true);
                }
            };

            recognition.onerror = (event) => {
                micBtn.classList.remove('active');
                micBtn.innerText = "🎤 Say it!";
                alert("Microphone error: " + event.error + ". Please try again.");
            };

            recognition.onend = () => {
                if(micBtn.classList.contains('active')){
                    micBtn.classList.remove('active');
                    micBtn.innerText = "🎤 Say it!";
                }
            };
        }

        // ---------- NEXT QUESTION ----------
        function nextQuestion() {
            currentLevelIndex++;
            loadQuestion();
        }

        // ---------- MINI GAME LOGIC ----------
        function startGames(levelKey) {
            currentGameData = allLevels[levelKey].questions;
            document.getElementById('map-screen').style.display = 'none';
            document.getElementById('mini-game-screen').style.display = 'block';
            document.getElementById('mini-game-result').innerText = "";
            startMiniGame('pair');
        }

        // ---------- EXIT MINI GAME ----------
        function exitMiniGame() {
            document.getElementById('mini-game-screen').style.display = 'none';
            document.getElementById('map-screen').style.display = 'block';
        }
    </script>
</body>
</html>
