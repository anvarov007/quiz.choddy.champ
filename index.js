/* =========================================================
   ZEHN JANGI — CLIENT GAME ENGINE
   Multiplayer Logic, Real-Time Sync, Web Audio SFX & Local Fallback
   ========================================================= */

// ==========================================
// 12 TA MANTIQIY VA MATEMATIK BOSQICH
// ==========================================
const LOCAL_PUZZLE_STAGES = [
    {
        stage: 1,
        title: "1-Bosqich: Sonlar zanjiri",
        category: "Mantiqiy ketma-ketlik",
        difficulty: "Oson",
        icon: "🔢",
        question: "Ketma-ketlikdagi bo'sh o'rinni to'ldiring:\n2, 4, 8, 16, [ ? ]",
        hint: "Har bir keyingi son oldingisidan 2 barobar katta (ko'paytirish).",
        answers: ["32", "o'ttiz ikki", "ottiz ikki"],
        points: 100
    },
    {
        stage: 2,
        title: "2-Bosqich: Xalq topishmog'i",
        category: "Mantiqiy topishmoq",
        difficulty: "Oson",
        icon: "🧩",
        question: "O'zining ko'zi bor, lekin hech narsani ko'rmaydi. Kiyimi yo'q, lekin hamma narsani tikadi. Bu nima?",
        hint: "Tikuvchilikda ip o'tkazib ishlatiladigan buyum.",
        answers: ["nina", "igna", "ignadir", "ninadir"],
        points: 150
    },
    {
        stage: 3,
        title: "3-Bosqich: Daraxtdagi mevalar",
        category: "Tezkor hisob",
        difficulty: "Oson-O'rtacha",
        icon: "🍎",
        question: "Olma daraxtida 7 ta katta shox bor. Har bir shoxda 7 tadan olma yetilgan. Agar bolalar 3 ta olmani uzib olishsa, daraxtda nechta olma qoladi?",
        hint: "Oldin jami olmalarni hisoblang: 7 × 7, keyin 3 tani ayiring.",
        answers: ["46", "46 ta", "qirq olti"],
        points: 200
    },
    {
        stage: 4,
        title: "4-Bosqich: Mashhur ketma-ketlik",
        category: "Matematik qonuniyat",
        difficulty: "O'rtacha",
        icon: "⚡",
        question: "Ushbu qonuniyatni toping va so'roq belgisi o'rnidagi sonni yozing:\n1, 1, 2, 3, 5, 8, [ ? ]",
        hint: "Har bir son o'zidan oldingi ikkita sonning yig'indisiga teng (Fibonachchi ketma-ketligi).",
        answers: ["13", "o'n uch", "on uch"],
        points: 250
    },
    {
        stage: 5,
        title: "5-Bosqich: Vaqt va Kunlar",
        category: "Chalg'ituvchi mantiq",
        difficulty: "O'rtacha",
        icon: "📅",
        question: "Agar kecha 'ertaga' bo'lganida edi, bugun juma bo'lardi. Unda bugun qaysi kun?",
        hint: "Juma kunidan 2 kun oldinga yoki orqaga qarab mantiqni tekshiring.",
        answers: ["yakshanba", "yakshanba kuni", "yakshanbadir"],
        points: 300
    },
    {
        stage: 6,
        title: "6-Bosqich: Mushuklar va Sichqonlar",
        category: "Tezkor mantiq",
        difficulty: "O'rtacha",
        icon: "🐱",
        question: "3 ta mushuk 3 daqiqada 3 ta sichqonni tuta oladi. 100 ta mushuk 100 ta sichqonni necha daqiqada tutadi?",
        hint: "1 ta mushuk 1 ta sichqonni tutishi uchun necha daqiqa ketishini o'ylab ko'ring.",
        answers: ["3", "3 daqiqa", "3 min", "uch", "uch daqiqa"],
        points: 350
    },
    {
        stage: 7,
        title: "7-Bosqich: Kalendar siri",
        category: "E'tibor sinovi",
        difficulty: "O'rtacha",
        icon: "🗓️",
        question: "Bir yilda nechta oyda 28 kun bor?",
        hint: "Faqat fevral oyi emas! 30 va 31 kunlik oylarda ham 28-kun bormi?",
        answers: ["12", "12 ta", "o'n ikki", "on ikki", "hamma oylarida", "12 oyda"],
        points: 400
    },
    {
        stage: 8,
        title: "8-Bosqich: Soat millari burchagi",
        category: "Geometriya va hisob",
        difficulty: "Qiyin",
        icon: "⏰",
        question: "Soat roppa-rosa 3:15 bo'lganda, soat mili bilan daqiqa mili orasidagi burchak necha gradus bo'ladi? (Raqamda yozing, masalan: 7.5)",
        hint: "Daqiqa mili 15 daqiqada 90 gradusga siljiydi, lekin bu vaqtda soat mili ham 3 dan biroz siljigan bo'ladi!",
        answers: ["7.5", "7,5", "7.5 gradus", "7,5 gradus"],
        points: 450
    },
    {
        stage: 9,
        title: "9-Bosqich: Sirli son",
        category: "Sehrli matematika",
        difficulty: "Qiziqarli",
        icon: "💡",
        question: "Qaysi musbat butun sonni o'ziga ko'paytirsa ham, o'ziga qo'shsa ham aynan bir xil natija hosil bo'ladi?",
        hint: "x + x = x × x tenglamasini musbat son uchun yeching.",
        answers: ["2", "ikki", "+2"],
        points: 500
    },
    {
        stage: 10,
        title: "10-Bosqich: G'ishtning og'irligi",
        category: "Tenglama va muvozanat",
        difficulty: "Qiyin",
        icon: "⚖️",
        question: "Bitta g'ishtning og'irligi 1 kg va yana yarimta g'isht og'irligiga teng. To'liq bitta g'isht necha kg tosh bosadi?",
        hint: "Tenglama: G'isht = 1 kg + 0.5 × G'isht. Yarim g'isht = 1 kg bo'lsa, to'liq g'isht qancha?",
        answers: ["2", "2 kg", "2kg", "ikki", "ikki kg"],
        points: 550
    },
    {
        stage: 11,
        title: "11-Bosqich: Qadamlar farqi",
        category: "Progressiya",
        difficulty: "Murakkab",
        icon: "🧠",
        question: "Ushbu qatordagi navbatdagi sonni toping:\n3, 5, 9, 17, 33, [ ? ]",
        hint: "Oradagi farqlarga qarang: +2, +4, +8, +16... Keyingi qadam necha bo'ladi?",
        answers: ["65", "oltmish besh"],
        points: 600
    },
    {
        stage: 12,
        title: "12-Bosqich: Super Final — Ota va O'g'il",
        category: "Olimpiada jumbog'i",
        difficulty: "Ekspert",
        icon: "👑",
        question: "Hozir otasi 36 yoshda, o'g'li esa 10 yoshda. Necha yildan keyin ota o'g'lidan roppa-rosa 2 barobar katta bo'ladi?",
        hint: "Yillar o'tishi bilan ikkalasi ham bir xil yoshga qariydi: 36 + x = 2 × (10 + x)",
        answers: ["16", "16 yil", "16 yildan so'ng", "o'n olti", "on olti"],
        points: 700
    }
];

// Web Audio API ovoz sintezatori
class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) this.ctx = new AudioCtx();
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    playClick() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(480, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
        } catch (e) { }
    }

    playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const notes = [523.25, 659.25, 783.99, 1046.5];
            notes.forEach((freq, i) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.07);
                gain.gain.setValueAtTime(0.18, this.ctx.currentTime + i * 0.07);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.07 + 0.3);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + i * 0.07);
                osc.stop(this.ctx.currentTime + i * 0.07 + 0.3);
            });
        } catch (e) { }
    }

    playError() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(180, this.ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.25);
            gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.25);
        } catch (e) { }
    }

    playVictory() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const chords = [
                { f: 523.25, t: 0.0, d: 0.2 },
                { f: 659.25, t: 0.15, d: 0.2 },
                { f: 783.99, t: 0.3, d: 0.2 },
                { f: 1046.5, t: 0.45, d: 0.8 }
            ];
            chords.forEach(c => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(c.f, this.ctx.currentTime + c.t);
                gain.gain.setValueAtTime(0.25, this.ctx.currentTime + c.t);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + c.t + c.d);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(this.ctx.currentTime + c.t);
                osc.stop(this.ctx.currentTime + c.t + c.d);
            });
        } catch (e) { }
    }

    playReaction() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.1);
        } catch (e) { }
    }
}

// Global holat
const sounds = new SoundEngine();
let socket = null;
let isSocketConnected = false;
let isGameStarted = false;
let isLocalMode = false;

let myPlayer = {
    id: 'me',
    name: "O'yinchi",
    avatar: '🧠',
    stage: 1,
    score: 0,
    isFinished: false
};
let totalStagesCount = LOCAL_PUZZLE_STAGES.length;
let selectedAvatar = '🧠';

// Lokal rejimdagi virtual musobaqadoshlar (Bots)
let virtualCompetitors = [
    { id: 'b1', name: 'Sardor', avatar: '🚀', stage: 1, score: 0, isFinished: false, rank: 2 },
    { id: 'b2', name: 'Malika', avatar: '⚡', stage: 1, score: 0, isFinished: false, rank: 3 },
    { id: 'b3', name: 'Javohir', avatar: '🦊', stage: 1, score: 0, isFinished: false, rank: 4 },
    { id: 'b4', name: 'Zilola', avatar: '🦁', stage: 1, score: 0, isFinished: false, rank: 5 },
    { id: 'b5', name: 'Jasur', avatar: '👑', stage: 1, score: 0, isFinished: false, rank: 6 }
];
let botInterval = null;

// DOM elementlari
const loginScreen = document.getElementById('login-screen');
const gameScreen = document.getElementById('game-screen');
const winnerModal = document.getElementById('winner-modal');

const loginForm = document.getElementById('login-form');
const playerNameInput = document.getElementById('player-name-input');
const avatarBtns = document.querySelectorAll('.avatar-btn');

const serverBadge = document.getElementById('server-status-badge');
const serverStatusText = document.getElementById('server-status-text');
const headerOnlineCount = document.getElementById('header-online-count');
const sidebarPlayerCount = document.getElementById('sidebar-player-count');
const soundToggleBtn = document.getElementById('sound-toggle-btn');
const soundIcon = document.getElementById('sound-icon');

// User status DOM
const currentUserAvatar = document.getElementById('current-user-avatar');
const currentUserName = document.getElementById('current-user-name');
const currentUserRankText = document.getElementById('current-user-rank-text');
const currentUserScore = document.getElementById('current-user-score');
const currentStageDisplay = document.getElementById('current-stage-display');
const stagePercentText = document.getElementById('stage-percent-text');
const progressBarFill = document.getElementById('progress-bar-fill');
const stageDotsRow = document.getElementById('stage-dots-row');

// Puzzle DOM
const puzzleCard = document.getElementById('puzzle-card');
const puzzleCategory = document.getElementById('puzzle-category');
const puzzleDifficulty = document.getElementById('puzzle-difficulty');
const puzzlePoints = document.getElementById('puzzle-points');
const puzzleIcon = document.getElementById('puzzle-icon');
const puzzleTitle = document.getElementById('puzzle-title');
const puzzleQuestion = document.getElementById('puzzle-question');
const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer-input');
const btnSubmitAnswer = document.getElementById('btn-submit-answer');
const answerFeedback = document.getElementById('answer-feedback');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const btnRequestHint = document.getElementById('btn-request-hint');
const hintContent = document.getElementById('hint-content');
const hintText = document.getElementById('hint-text');

// Feed, Reactions, Leaderboard
const activityFeedStream = document.getElementById('activity-feed-stream');
const reactionsContainer = document.getElementById('reactions-container');
const reactionBtns = document.querySelectorAll('.reaction-btn');
const leaderboardList = document.getElementById('leaderboard-list');

// Winners & Podium DOM
const winnerHeadline = document.getElementById('winner-headline');
const winnerSubline = document.getElementById('winner-subline');
const podiumGoldName = document.getElementById('podium-gold-name');
const podiumGoldAvatar = document.getElementById('podium-gold-avatar');
const podiumGoldScore = document.getElementById('podium-gold-score');
const podiumSilverName = document.getElementById('podium-silver-name');
const podiumSilverAvatar = document.getElementById('podium-silver-avatar');
const podiumSilverScore = document.getElementById('podium-silver-score');
const podiumBronzeName = document.getElementById('podium-bronze-name');
const podiumBronzeAvatar = document.getElementById('podium-bronze-avatar');
const podiumBronzeScore = document.getElementById('podium-bronze-score');
const btnRestartGame = document.getElementById('btn-restart-game');
const btnCloseWinnerModal = document.getElementById('btn-close-winner-modal');

// ==========================================
// 1. SOCKET.IO CONNECTION MANAGEMENT
// ==========================================
function initSocket() {
    if (typeof io === 'undefined') {
        setOfflineModeStatus('Offline (Kutubxona topilmadi)');
        return;
    }

    try {
        // Agar port 3000 da ochilgan bo'lsa to'g'ridan to'g'ri, aks holda localhost:3000 ga ulanish
        const serverUrl = (window.location.port === '3000')
            ? window.location.origin
            : 'http://localhost:3000';

        socket = io(serverUrl, {
            reconnectionAttempts: 10,
            timeout: 3000
        });

        socket.on('connect', () => {
            isSocketConnected = true;
            serverBadge.classList.remove('disconnected');
            serverStatusText.textContent = '🟢 Serverga ulangan';
            addFeedItem("⚡ Real-time multiplayer serveriga ulandingiz!", "advance");
        });

        socket.on('connect_error', () => {
            isSocketConnected = false;
            setOfflineModeStatus("🟡 Lokal / Demo Rejim");
        });

        socket.on('disconnect', () => {
            isSocketConnected = false;
            setOfflineModeStatus("🔴 Serverdan uzildi");
        });

        // Serverdan o'yin ma'lumotlari kelganda
        socket.on('game_init', (data) => {
            isLocalMode = false;
            myPlayer = data.player;
            totalStagesCount = data.totalStages;
            activateGameScreen();
            renderPuzzle(data.currentPuzzle);
            updatePodium(data.winners || []);
        });

        // Server javob tekshiruvi natijasi
        socket.on('answer_result', (res) => {
            if (isLocalMode) return;
            btnSubmitAnswer.disabled = false;
            handleAnswerFeedback(res.success, res.message, res.newScore, res.newStage, res.nextPuzzle);
        });

        // Server maslahati
        socket.on('hint_response', (data) => {
            if (isLocalMode) return;
            hintText.textContent = data.hint;
            hintContent.classList.remove('hidden');
        });

        // O'yin yakunlanganda
        socket.on('game_completed', (data) => {
            if (isLocalMode) return;
            showVictoryModal(data.rank, data.score, data.winners);
        });

        socket.on('global_winner_announced', (data) => {
            updatePodium(data.winners);
        });

        // Server Wi-Fi manzili (QR kod uchun)
        socket.on('server_info', (info) => {
            if (info && info.networkUrl) {
                updateQRCode(info.networkUrl);
            }
        });

        // Jonli reyting yangilanishi
        socket.on('leaderboard_update', (data) => {
            if (isLocalMode) return;
            headerOnlineCount.textContent = data.onlineCount;
            sidebarPlayerCount.textContent = `${data.onlineCount} o'yinchi`;
            renderLeaderboard(data.leaderboard);
            updatePodium(data.winners);
        });

        socket.on('activity_feed', (data) => {
            addFeedItem(data.text, data.type);
        });

        socket.on('new_reaction', (data) => {
            sounds.playReaction();
            spawnFloatingReaction(data.emoji);
        });

        socket.on('player_joined', (data) => {
            addFeedItem(`👋 ${data.avatar} ${data.name} o'yinga qo'shildi!`, 'join');
        });

        socket.on('player_left', (data) => {
            addFeedItem(`🚶 ${data.name} chiqib ketdi.`, 'leave');
        });

    } catch (err) {
        console.warn("Socket ulana olmadi, lokal rejim faollashdi:", err);
        setOfflineModeStatus("🟡 Lokal / Demo Rejim");
    }
}

function setOfflineModeStatus(msg) {
    serverBadge.classList.add('disconnected');
    serverStatusText.textContent = msg;
}

// ==========================================
// 2. KIRISH TIZIMI (JOIN GAME)
// ==========================================
avatarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sounds.playClick();
        avatarBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedAvatar = btn.getAttribute('data-avatar');
    });
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sounds.playClick();

    const rawName = playerNameInput.value.trim();
    const playerName = rawName || "Qahramon";

    myPlayer.name = playerName;
    myPlayer.avatar = selectedAvatar;
    myPlayer.stage = 1;
    myPlayer.score = 0;
    myPlayer.isFinished = false;

    // Agar serverga ulangan bo'lsa, server orqali kirish
    if (isSocketConnected && socket) {
        socket.emit('join_game', {
            name: playerName,
            avatar: selectedAvatar
        });

        // 800ms ichida server javob bermasa, qotib qolmaslik uchun darhol o'yinga kiritish!
        setTimeout(() => {
            if (!isGameStarted) {
                startLocalGame(playerName, selectedAvatar);
            }
        }, 800);
    } else {
        // Server ishlamayotgan bo'lsa ham foydalanuvchini QOTIRMASDAN o'yinga kiritish!
        startLocalGame(playerName, selectedAvatar);
    }
});

// ==========================================
// 3. LOKAL / DEMO MULTIPLAYER REJIMI
// ==========================================
function startLocalGame(playerName, avatar) {
    isLocalMode = true;
    totalStagesCount = LOCAL_PUZZLE_STAGES.length;

    activateGameScreen();
    renderPuzzle(LOCAL_PUZZLE_STAGES[0]);

    // Virtual o'yinchilar bilan jonli musobaqa boshlash
    headerOnlineCount.textContent = (virtualCompetitors.length + 1).toString();
    sidebarPlayerCount.textContent = `${virtualCompetitors.length + 1} o'yinchi`;

    addFeedItem(`🎮 ${avatar} ${playerName} o'yinga kirdi! Bellashuv boshlandi!`, 'join');
    addFeedItem(`💡 Maslahat: Tarmoqli multiplayer uchun VS Code-da "node server.js" ni ishga tushiring.`, 'info');

    updateLocalLeaderboard();
    startBotSimulation();
}

function activateGameScreen() {
    isGameStarted = true;
    loginScreen.classList.remove('active');
    loginScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameScreen.classList.add('active');

    currentUserAvatar.textContent = myPlayer.avatar;
    currentUserName.textContent = myPlayer.name;
    currentUserScore.textContent = myPlayer.score;

    renderStageDots(totalStagesCount, myPlayer.stage);
    updateProgress(myPlayer.stage, totalStagesCount);
}

// Botlarning orqa fonda bosqichlardan o'tishi (Jonli raqobat effekti)
function startBotSimulation() {
    if (botInterval) clearInterval(botInterval);

    botInterval = setInterval(() => {
        if (!isLocalMode || myPlayer.isFinished) return;

        // Tasodifiy bitta botni tanlash
        const unfinishedBots = virtualCompetitors.filter(b => !b.isFinished);
        if (unfinishedBots.length === 0) return;

        const randomBot = unfinishedBots[Math.floor(Math.random() * unfinishedBots.length)];
        if (randomBot.stage < totalStagesCount) {
            randomBot.stage += 1;
            randomBot.score += 150 + Math.floor(Math.random() * 100);

            addFeedItem(`⚡ ${randomBot.avatar} ${randomBot.name} ${randomBot.stage}-bosqichga o'tdi! (+${randomBot.score} ball)`, 'advance');

            if (randomBot.stage >= totalStagesCount) {
                randomBot.isFinished = true;
                addFeedItem(`👑 ${randomBot.name} barcha bosqichlarni yakunladi!`, 'winner');
            }

            updateLocalLeaderboard();
        }
    }, 7000);
}

function updateLocalLeaderboard() {
    const allPlayers = [
        { ...myPlayer, id: 'me' },
        ...virtualCompetitors
    ];

    allPlayers.sort((a, b) => {
        if (a.isFinished && !b.isFinished) return -1;
        if (!a.isFinished && b.isFinished) return 1;
        if (b.stage !== a.stage) return b.stage - a.stage;
        return b.score - a.score;
    });

    allPlayers.forEach((p, idx) => p.rank = idx + 1);
    renderLeaderboard(allPlayers);
}

// ==========================================
// 4. JAVOBNI TEKSHIRISH
// ==========================================
answerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawAnswer = answerInput.value.trim();
    if (!rawAnswer) return;

    sounds.playClick();
    btnSubmitAnswer.disabled = true;

    if (!isLocalMode && isSocketConnected && socket) {
        socket.emit('submit_answer', { answer: rawAnswer });
    } else {
        // Lokal rejimda javobni tekshirish
        checkAnswerLocally(rawAnswer);
        setTimeout(() => { btnSubmitAnswer.disabled = false; }, 300);
    }
});

function normalizeAnswer(text) {
    if (!text) return '';
    return text
        .toString()
        .trim()
        .toLowerCase()
        .replace(/['`’‘ʼ]/g, "'")
        .replace(/\s+/g, ' ');
}

function checkAnswerLocally(userAns) {
    const currentPuzzle = LOCAL_PUZZLE_STAGES[myPlayer.stage - 1];
    if (!currentPuzzle) return;

    const cleanAns = normalizeAnswer(userAns);
    const isCorrect = currentPuzzle.answers.some(a => normalizeAnswer(a) === cleanAns);

    if (isCorrect) {
        const earned = currentPuzzle.points;
        myPlayer.score += earned;

        if (myPlayer.stage < totalStagesCount) {
            myPlayer.stage += 1;
            const nextPuzzle = LOCAL_PUZZLE_STAGES[myPlayer.stage - 1];

            handleAnswerFeedback(true, "To'g'ri javob! Ajoyib! 🎉", myPlayer.score, myPlayer.stage, nextPuzzle);
            addFeedItem(`🚀 Siz ${myPlayer.stage}-bosqichga ko'tarildingiz! (+${earned} ball)`, 'advance');
            updateLocalLeaderboard();
        } else {
            // O'yin g'olibi bo'ldi!
            myPlayer.isFinished = true;
            handleAnswerFeedback(true, "Barcha bosqichlar muvaffaqiyatli yakunlandi! 🏆", myPlayer.score, myPlayer.stage);
            updateLocalLeaderboard();

            const winners = [
                { rank: 1, name: myPlayer.name, avatar: myPlayer.avatar, score: myPlayer.score },
                { rank: 2, name: virtualCompetitors[0].name, avatar: virtualCompetitors[0].avatar, score: virtualCompetitors[0].score },
                { rank: 3, name: virtualCompetitors[1].name, avatar: virtualCompetitors[1].avatar, score: virtualCompetitors[1].score }
            ];

            showVictoryModal(1, myPlayer.score, winners);
        }
    } else {
        handleAnswerFeedback(false, "Noto'g'ri javob! Yana bir bor diqqat bilan o'ylab ko'ring yoki 'Maslahat' oling.");
    }
}

function handleAnswerFeedback(isSuccess, msg, newScore, newStage, nextPuzzle) {
    if (isSuccess) {
        sounds.playSuccess();
        showFeedback(true, msg);

        puzzleCard.classList.add('success-glow-anim');
        setTimeout(() => puzzleCard.classList.remove('success-glow-anim'), 600);
        triggerSmallConfetti();

        if (newScore !== undefined) {
            myPlayer.score = newScore;
            currentUserScore.textContent = newScore;
        }
        if (newStage !== undefined) {
            myPlayer.stage = newStage;
            updateProgress(newStage, totalStagesCount);
            renderStageDots(totalStagesCount, newStage);
        }
        if (nextPuzzle) {
            renderPuzzle(nextPuzzle);
        }
    } else {
        sounds.playError();
        showFeedback(false, msg);

        puzzleCard.classList.add('shake-anim');
        setTimeout(() => puzzleCard.classList.remove('shake-anim'), 500);
    }
}

// Maslahat (Hint)
btnRequestHint.addEventListener('click', () => {
    sounds.playClick();
    if (!isLocalMode && isSocketConnected && socket) {
        socket.emit('request_hint');
    } else {
        const puzzle = LOCAL_PUZZLE_STAGES[myPlayer.stage - 1];
        if (puzzle && puzzle.hint) {
            hintText.textContent = puzzle.hint;
            hintContent.classList.remove('hidden');
        }
    }
});

// ==========================================
// 5. INTERFEYSNI CHIZISH VA YANGILASH
// ==========================================
function renderPuzzle(puzzle) {
    if (!puzzle) return;
    puzzleIcon.textContent = puzzle.icon || '🧩';
    puzzleTitle.textContent = puzzle.title;
    puzzleCategory.textContent = puzzle.category;
    puzzleDifficulty.textContent = puzzle.difficulty;
    puzzlePoints.textContent = `+${puzzle.points} ball`;
    puzzleQuestion.textContent = puzzle.question;

    hintContent.classList.add('hidden');
    hintText.textContent = '';
    answerFeedback.classList.add('hidden');
    answerInput.value = '';
    answerInput.focus();
}

function updateProgress(currentStage, totalStages) {
    currentStageDisplay.textContent = `${currentStage} / ${totalStages}`;
    const percent = Math.min(100, Math.round(((currentStage - 1) / totalStages) * 100));
    progressBarFill.style.width = `${percent}%`;
    stagePercentText.textContent = `${percent}%`;
}

function renderStageDots(total, current) {
    stageDotsRow.innerHTML = '';
    for (let i = 1; i <= total; i++) {
        const dot = document.createElement('div');
        dot.className = 'stage-dot';
        dot.textContent = i;
        if (i < current) {
            dot.classList.add('completed');
        } else if (i === current) {
            dot.classList.add('current');
        }
        stageDotsRow.appendChild(dot);
    }
}

function showFeedback(isSuccess, message) {
    answerFeedback.classList.remove('hidden', 'success', 'error');
    if (isSuccess) {
        answerFeedback.classList.add('success');
        feedbackIcon.textContent = '✓';
    } else {
        answerFeedback.classList.add('error');
        feedbackIcon.textContent = '✕';
    }
    feedbackText.textContent = message;
}

function renderLeaderboard(players) {
    if (!players || !Array.isArray(players)) return;
    leaderboardList.innerHTML = '';

    let myRank = null;

    players.forEach((p) => {
        const isMe = (p.id === 'me' || (myPlayer && p.id === myPlayer.id));
        if (isMe) myRank = p.rank;

        const row = document.createElement('div');
        row.className = `player-row ${isMe ? 'is-me' : ''}`;

        let rankBadge = p.rank;
        if (p.rank === 1) rankBadge = '🥇';
        else if (p.rank === 2) rankBadge = '🥈';
        else if (p.rank === 3) rankBadge = '🥉';

        row.innerHTML = `
      <div class="player-rank rank-${p.rank}">${rankBadge}</div>
      <div class="player-avatar">${p.avatar}</div>
      <div class="player-details">
        <div class="player-name-line">
          <span class="player-name">${escapeHTML(p.name)}</span>
          ${isMe ? '<span class="me-badge">Siz</span>' : ''}
          ${p.isFinished ? '<span class="finished-tag">Tugatdi 🏁</span>' : ''}
        </div>
        <div class="player-subline">
          <span class="player-stage-tag">${p.stage}-bosqich</span>
          <span>•</span>
          <span class="player-score-tag">${p.score} ball</span>
        </div>
      </div>
    `;

        leaderboardList.appendChild(row);
    });

    if (myRank) {
        currentUserRankText.textContent = `Reyting: #${myRank}`;
    }

    updateMiniPodium(players);
}

function updateMiniPodium(players) {
    const p1 = players[0];
    const p2 = players[1];
    const p3 = players[2];

    const col1 = document.getElementById('podium-preview-1');
    const col2 = document.getElementById('podium-preview-2');
    const col3 = document.getElementById('podium-preview-3');

    if (col1) {
        col1.querySelector('.mini-podium-avatar').textContent = p1 ? p1.avatar : '🥇';
        col1.querySelector('.mini-podium-name').textContent = p1 ? p1.name : 'Yetakchi';
    }
    if (col2) {
        col2.querySelector('.mini-podium-avatar').textContent = p2 ? p2.avatar : '🥈';
        col2.querySelector('.mini-podium-name').textContent = p2 ? p2.name : 'Kutilmoqda';
    }
    if (col3) {
        col3.querySelector('.mini-podium-avatar').textContent = p3 ? p3.avatar : '🥉';
        col3.querySelector('.mini-podium-name').textContent = p3 ? p3.name : 'Kutilmoqda';
    }
}

function updatePodium(winnersList) {
    if (!winnersList || !Array.isArray(winnersList)) return;

    const w1 = winnersList[0];
    const w2 = winnersList[1];
    const w3 = winnersList[2];

    if (w1) {
        podiumGoldName.textContent = w1.name;
        podiumGoldAvatar.textContent = w1.avatar || '👑';
        podiumGoldScore.textContent = `${w1.score} ball`;
    }
    if (w2) {
        podiumSilverName.textContent = w2.name;
        podiumSilverAvatar.textContent = w2.avatar || '🥈';
        podiumSilverScore.textContent = `${w2.score} ball`;
    }
    if (w3) {
        podiumBronzeName.textContent = w3.name;
        podiumBronzeAvatar.textContent = w3.avatar || '🥉';
        podiumBronzeScore.textContent = `${w3.score} ball`;
    }
}

function showVictoryModal(rank, score, winners) {
    sounds.playVictory();
    triggerGrandConfetti();

    winnerHeadline.textContent = (rank === 1) ? "SIZ MUTLOQ G'OLIBSİZ! 🥇" : `SIZ ${rank}-O'RINNI EGALLADINGIZ! 🎉`;
    winnerSubline.textContent = `Barcha boshqotirmalar yechildi! Jami to'plangan ball: ${score}`;

    if (winners && winners.length > 0) {
        updatePodium(winners);
    }
    winnerModal.classList.remove('hidden');
}

// Jonli xabarlar tasmasi
function addFeedItem(text, type = 'info') {
    if (!activityFeedStream) return;
    const item = document.createElement('div');
    item.className = `feed-item ${type}`;
    item.textContent = text;
    activityFeedStream.appendChild(item);
    activityFeedStream.scrollTop = activityFeedStream.scrollHeight;

    while (activityFeedStream.children.length > 30) {
        activityFeedStream.removeChild(activityFeedStream.firstChild);
    }
}

// Suzuvchi emoji reaksiyalari
function spawnFloatingReaction(emoji) {
    if (!reactionsContainer) return;
    const elem = document.createElement('div');
    elem.className = 'floating-reaction';
    elem.textContent = emoji;

    const randomX = Math.floor(Math.random() * 80) + 10;
    elem.style.left = `${randomX}%`;

    reactionsContainer.appendChild(elem);

    setTimeout(() => {
        if (elem.parentNode) elem.parentNode.removeChild(elem);
    }, 3300);
}

reactionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const emoji = btn.getAttribute('data-emoji');
        if (!emoji) return;

        if (!isLocalMode && isSocketConnected && socket) {
            socket.emit('send_reaction', emoji);
        } else {
            sounds.playReaction();
            spawnFloatingReaction(emoji);
        }
    });
});

// Ovoz sozlamasi
soundToggleBtn.addEventListener('click', () => {
    const isEnabled = sounds.toggle();
    soundIcon.textContent = isEnabled ? '🔊' : '🔇';
    soundToggleBtn.title = isEnabled ? "Ovozni o'chirish" : "Ovozni yoqish";
});

// Modalni yopish
btnCloseWinnerModal.addEventListener('click', () => {
    winnerModal.classList.add('hidden');
});

// Qayta o'ynash
btnRestartGame.addEventListener('click', () => {
    winnerModal.classList.add('hidden');
    if (!isLocalMode && isSocketConnected && socket) {
        socket.emit('restart_game');
    } else {
        myPlayer.stage = 1;
        myPlayer.score = 0;
        myPlayer.isFinished = false;
        activateGameScreen();
        renderPuzzle(LOCAL_PUZZLE_STAGES[0]);
        updateLocalLeaderboard();
    }
});

function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g,
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Konfetti effektlari
function triggerSmallConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 35,
            spread: 60,
            origin: { y: 0.7 }
        });
    }
}

function triggerGrandConfetti() {
    if (typeof confetti !== 'function') return;
    const duration = 4000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}

// ==========================================
// 6. QR KOD VA DO'STLARNI TAKLIF QILISH
// ==========================================
let currentJoinUrl = (window.location.protocol.startsWith('http') && window.location.port === '3000')
    ? window.location.origin
    : 'http://localhost:3000';

function updateQRCode(url) {
    if (url && typeof url === 'string') {
        currentJoinUrl = url;
    }

    // QR kodni yuqori sifatli qilib generatsiya qilish (QRServer API)
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(currentJoinUrl)}&margin=8&color=070913&bgcolor=ffffff`;

    const previewImg = document.getElementById('qr-preview-img');
    const bigImg = document.getElementById('qr-modal-big-img');
    const urlText = document.getElementById('game-network-url-text');
    const modalUrlText = document.getElementById('qr-modal-url-display');

    if (previewImg) previewImg.src = qrApiUrl;
    if (bigImg) bigImg.src = qrApiUrl;
    if (urlText) urlText.textContent = currentJoinUrl;
    if (modalUrlText) modalUrlText.textContent = currentJoinUrl;
}

// Havolani nusxalash
function copyGameUrl(btnElement, iconId, labelId) {
    sounds.playClick();

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentJoinUrl).catch(() => fallbackCopy(currentJoinUrl));
    } else {
        fallbackCopy(currentJoinUrl);
    }

    if (btnElement) {
        btnElement.classList.add('copied');
        const label = document.getElementById(labelId);
        const icon = document.getElementById(iconId);

        if (label) label.textContent = '✓ Nusxalandi!';
        if (icon) icon.textContent = '✅';

        setTimeout(() => {
            btnElement.classList.remove('copied');
            if (label) label.textContent = (labelId === 'modal-copy-label') ? 'Nusxa Olish' : 'Nusxalash';
            if (icon) icon.textContent = '📋';
        }, 2000);
    }
}

function fallbackCopy(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) { }
    document.body.removeChild(textArea);
}

// QR Kod Modal elementlari
const qrModal = document.getElementById('qr-modal');
const btnOpenQrModal = document.getElementById('btn-open-qr-modal');
const btnCloseQrModal = document.getElementById('btn-close-qr-modal');
const qrClickToEnlarge = document.getElementById('qr-click-to-enlarge');
const btnCopyGameLink = document.getElementById('btn-copy-game-link');
const btnModalCopyLink = document.getElementById('btn-modal-copy-link');

if (btnOpenQrModal) {
    btnOpenQrModal.addEventListener('click', () => {
        sounds.playClick();
        if (qrModal) qrModal.classList.remove('hidden');
    });
}

if (qrClickToEnlarge) {
    qrClickToEnlarge.addEventListener('click', () => {
        sounds.playClick();
        if (qrModal) qrModal.classList.remove('hidden');
    });
}

if (btnCloseQrModal) {
    btnCloseQrModal.addEventListener('click', () => {
        sounds.playClick();
        if (qrModal) qrModal.classList.add('hidden');
    });
}

// Modal foniga bosganda yopish
if (qrModal) {
    qrModal.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.classList.add('hidden');
        }
    });
}

if (btnCopyGameLink) {
    btnCopyGameLink.addEventListener('click', (e) => {
        e.stopPropagation();
        copyGameUrl(btnCopyGameLink, 'copy-icon', 'copy-label');
    });
}

if (btnModalCopyLink) {
    btnModalCopyLink.addEventListener('click', () => {
        copyGameUrl(btnModalCopyLink, 'modal-copy-icon', 'modal-copy-label');
    });
}

// Dastur yuklanganda socket va QR kodni ishga tushirish
window.addEventListener('DOMContentLoaded', () => {
    initSocket();

    // Dastlabki QR kodni chiqarish
    updateQRCode(currentJoinUrl);

    // Serverdan mahalliy tarmoq IP manzilini so'rash
    fetch('/api/server-info')
        .then(res => res.json())
        .then(data => {
            if (data && data.networkUrl) {
                updateQRCode(data.networkUrl);
            }
        })
        .catch(() => {
            // Agar server ochilmagan bo'lsa standart havola qoladi
        });
});
