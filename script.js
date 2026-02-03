const quotes = [
    "You’re dangerously easy to like.",
    "I wasn’t planning to flirt today… then you showed up.",
    "You make ‘just one text’ turn into midnight conversations.",
    "You’re my favorite kind of distraction.",
    "I like how calm everything feels when it’s just us.",
    "You have that ‘come closer’ energy and it’s unfair.",
    "I don’t chase people… but I’d walk toward you.",
    "You’re trouble. The soft, smiling kind.",
    "This vibe with you? Yeah, I want more of that.",
    "You look at me like you already know something.",
    "I didn’t mean to catch feelings… but here we are.",
    "You make silence feel interesting.",
    "I could get used to you being this close.",
    "You’re low-key addictive.",
    "If you hold my hand, I’m not letting go first.",
    "You make normal moments feel special.",
    "I like how easy you make everything.",
    "You’re the kind of person I’d cancel plans for.",
    "I pretend to be chill, but you mess that up.",
    "Stay a little longer… I like this.",
    "You’re my favorite notification.",
    "I don’t flirt much. You’re just an exception.",
    "You feel like home… but hotter.",
    "I like the way you look at me. Don’t stop.",
    "We’d be a very good idea.",
    "You make my heart act unprofessional.",
    "You’re the reason I’m smiling at my screen.",
    "If this is a phase, I hope it never ends.",
    "You + me feels right. No overthinking.",
    "Come here… I just wanna be near you."
];


const heartEmojis = [
    "❤️",
    "💖",
    "💕",
    "💗",
    "💘",
    "💓",
    "💞",
    "🩷",
    "💝",
    "💟",
    "❣️",
    "😍",
    "🥰",
    "🫶",
    "✨"
];

const gifUrls = [
    "https://media1.tenor.com/images/edaa5608f651abfd84183d04c36ad9ca/tenor.gif?itemid=8129004",
];

const buttonZone = document.getElementById("button-zone");
const celebrateSection = document.getElementById("celebrate");
const gifGrid = document.getElementById("gif-grid");
const heartsLayer = document.getElementById("hearts-layer");
const confettiLayer = document.getElementById("confetti-layer");
const confettiCanvas = document.getElementById("confetti-canvas");
const outsideQuote = document.getElementById("outside-quote");
const mainCard = document.getElementById("main-card");
const yesButton = buttonZone.querySelector('.btn[data-role="yes"]');
const noButton = buttonZone.querySelector('.btn[data-role="no"]');

const confettiInstance =
    typeof confetti === "function" && confettiCanvas
        ? confetti.create(confettiCanvas, { resize: true, useWorker: true })
        : null;

let celebrationTriggered = false;
let yesScale = 1;
let maxScale = 18;
const stepScale = 0.35;

function celebrate() {
    if (celebrationTriggered) return;
    celebrationTriggered = true;
    document.body.classList.add("celebrate");
    if (mainCard) mainCard.classList.add("hidden");
    if (outsideQuote) outsideQuote.classList.add("hidden");
    celebrateSection.classList.remove("hidden");
    buildGifs();
    burstConfetti();
    addExtraHearts();
}

function buildGifs() {
    if (!gifGrid) return;
    gifGrid.innerHTML = "";
    gifUrls.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Celebration gif";
        img.loading = "lazy";
        gifGrid.appendChild(img);
    });
}

function burstConfetti() {
    const colors = [ "#ff5c9c", "#ff83bb", "#ffd1e4", "#ffb3d4", "#fff" ];

    if (confettiInstance) {
        const end = Date.now() + 1800;
        (function frame() {
            const originX = Math.random();
            const originY = Math.random() * 0.3;
            confettiInstance({
                particleCount: 22,
                spread: 360,
                origin: { x: originX, y: originY },
                colors,
                scalar: 1.05,
                startVelocity: 35,
                disableForReducedMotion: true
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
        return;
    }

    for (let i = 0; i < 140; i += 1) {
        const piece = document.createElement("span");
        piece.className = "confetti";
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.setProperty("--fall-duration", `${2 + Math.random() * 2.2}s`);
        piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
        piece.style.background = colors[ i % colors.length ];
        piece.style.animationDelay = `${Math.random() * 0.3}s`;
        confettiLayer.appendChild(piece);

        piece.addEventListener("animationend", () => {
            piece.remove();
        });
    }
}

function spawnHearts() {
    const count = 42;
    for (let i = 0; i < count; i += 1) {
        const heart = document.createElement("span");
        heart.className = "heart";
        heart.textContent =
            heartEmojis[ Math.floor(Math.random() * heartEmojis.length) ];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${12 + Math.random() * 26}px`;
        heart.style.opacity = `${0.35 + Math.random() * 0.6}`;
        heart.style.setProperty(
            "--float-duration",
            `${8 + Math.random() * 12}s`
        );
        heart.style.setProperty("--sway-duration", `${4 + Math.random() * 5}s`);
        heart.style.setProperty(
            "--sway-distance",
            `${18 + Math.random() * 38}px`
        );
        heart.style.animationDelay = `${Math.random() * 8}s`;
        heartsLayer.appendChild(heart);
    }
}

function addExtraHearts() {
    for (let i = 0; i < 14; i += 1) {
        const heart = document.createElement("span");
        heart.className = "heart";
        heart.textContent =
            heartEmojis[ Math.floor(Math.random() * heartEmojis.length) ];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${18 + Math.random() * 26}px`;
        heart.style.opacity = "0.8";
        heart.style.setProperty("--float-duration", `${6 + Math.random() * 6}s`);
        heart.style.setProperty("--sway-duration", `${3 + Math.random() * 4}s`);
        heart.style.setProperty(
            "--sway-distance",
            `${14 + Math.random() * 30}px`
        );
        heartsLayer.appendChild(heart);
    }
}

function rotateOutsideQuote() {
    if (!outsideQuote) return;
    const pick = quotes[ Math.floor(Math.random() * quotes.length) ];
    outsideQuote.textContent = `“${pick}”`;
}

function computeMaxScale() {
    if (!yesButton) return 18;
    const rect = yesButton.getBoundingClientRect();
    const scaleX = window.innerWidth / rect.width;
    const scaleY = window.innerHeight / rect.height;
    return Math.max(scaleX, scaleY) * 1.25;
}

function growYesStep() {
    if (!yesButton) return;
    if (yesScale < 1.02) {
        maxScale = computeMaxScale();
    }
    yesScale = Math.min(maxScale, yesScale + stepScale);
    yesButton.style.setProperty("--yes-scale", yesScale.toFixed(3));
    yesButton.classList.add("yes-growing");
}

if (yesButton) {
    yesButton.addEventListener("click", () => {
        celebrate();
    });
}

if (noButton) {
    noButton.addEventListener("click", (event) => {
        event.preventDefault();
        growYesStep();
    });
}

spawnHearts();
rotateOutsideQuote();
setInterval(rotateOutsideQuote, 3200);
