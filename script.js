// ══ ดาว (พื้นหลังมืด) ══
const starsCanvas = document.getElementById('stars');
const sCtx = starsCanvas.getContext('2d');
let W, H, stars = [];

function initStars() {
    W = starsCanvas.width  = window.innerWidth;
    H = starsCanvas.height = window.innerHeight;
    stars = Array.from({length: 200}, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.006,
        speed: Math.random() * 0.2 + 0.05
    }));
}
function drawStars() {
    sCtx.clearRect(0, 0, W, H);
    stars.forEach(s => {
        s.a = Math.max(0.05, Math.min(1, s.a + s.da));
        if (s.a <= 0.05 || s.a >= 1) s.da *= -1;
        s.y -= s.speed;
        if (s.y < 0) { s.y = H; s.x = Math.random() * W; }
        sCtx.beginPath();
        sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(240,214,255,${s.a})`;
        sCtx.fill();
    });
    requestAnimationFrame(drawStars);
}
window.addEventListener('resize', initStars);
initStars();
drawStars();


// ══ Particles (พื้นหลังสว่าง) ══
const pCanvas = document.getElementById('particles');
const pCtx = pCanvas.getContext('2d');
let pW, pH, particles = [];

function initParticles() {
    pW = pCanvas.width  = window.innerWidth;
    pH = pCanvas.height = window.innerHeight;
    particles = Array.from({length: 80}, () => ({
        x: Math.random() * pW,
        y: Math.random() * pH,
        r: Math.random() * 3 + 1,
        a: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.5 + 0.2,
        drift: (Math.random() - 0.5) * 0.4,
        color: ['255,179,71','255,120,150','200,140,255'][Math.floor(Math.random()*3)]
    }));
}
function drawParticles() {
    pCtx.clearRect(0, 0, pW, pH);
    particles.forEach(p => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < 0) { p.y = pH; p.x = Math.random() * pW; }
        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(${p.color},${p.a})`;
        pCtx.fill();
    });
    requestAnimationFrame(drawParticles);
}
window.addEventListener('resize', initParticles);
initParticles();
drawParticles();


// ══ เค้กแฟนตาซี ══
const cakeCanvas = document.getElementById('cake-canvas');
const cCtx = cakeCanvas.getContext('2d');
cakeCanvas.width  = 220;
cakeCanvas.height = 220;
let flicker = 0;

function drawCake() {
    cCtx.clearRect(0, 0, 220, 220);
    flicker += 0.08;

    // ── ฐานเค้ก ชั้น 2 ──
    const g2 = cCtx.createLinearGradient(40, 130, 40, 185);
    g2.addColorStop(0, '#c97fd4');
    g2.addColorStop(1, '#7b3fa0');
    cCtx.beginPath();
    cCtx.roundRect(40, 135, 140, 55, 8);
    cCtx.fillStyle = g2;
    cCtx.fill();

    // ── ลายวาว ──
    cCtx.fillStyle = 'rgba(255,255,255,0.12)';
    for (let i = 0; i < 5; i++) {
        cCtx.fillRect(50 + i * 26, 145, 10, 35);
    }

    // ── ฐานเค้ก ชั้น 1 ──
    const g1 = cCtx.createLinearGradient(20, 185, 20, 210);
    g1.addColorStop(0, '#e8a0c0');
    g1.addColorStop(1, '#b05080');
    cCtx.beginPath();
    cCtx.roundRect(20, 183, 180, 28, 6);
    cCtx.fillStyle = g1;
    cCtx.fill();

    // ── ครีม ──
    cCtx.fillStyle = 'rgba(255,240,255,0.9)';
    for (let i = 0; i < 7; i++) {
        cCtx.beginPath();
        cCtx.arc(33 + i * 26, 135, 9, Math.PI, 0);
        cCtx.fill();
    }

    // ── เทียน ──
    const candles = [75, 110, 145];
    candles.forEach((cx, i) => {
        // ตัวเทียน
        const cg = cCtx.createLinearGradient(cx - 5, 90, cx + 5, 90);
        cg.addColorStop(0, ['#ff9de2','#ffe066','#9de8ff'][i]);
        cg.addColorStop(1, ['#d94fa0','#f0a000','#3ab0d4'][i]);
        cCtx.beginPath();
        cCtx.roundRect(cx - 5, 98, 10, 36, 3);
        cCtx.fillStyle = cg;
        cCtx.fill();

        // เปลวไฟ
        const fFlicker = Math.sin(flicker + i * 1.2) * 3;
        const fg = cCtx.createRadialGradient(cx, 90 + fFlicker, 1, cx, 94 + fFlicker, 12);
        fg.addColorStop(0, 'rgba(255,255,200,1)');
        fg.addColorStop(0.4, 'rgba(255,160,50,.8)');
        fg.addColorStop(1, 'rgba(255,80,0,0)');
        cCtx.beginPath();
        cCtx.ellipse(cx, 90 + fFlicker, 6, 14, 0, 0, Math.PI * 2);
        cCtx.fillStyle = fg;
        cCtx.fill();

        // แสงเรือง
        const glow = cCtx.createRadialGradient(cx, 90, 0, cx, 90, 28);
        glow.addColorStop(0, 'rgba(255,200,80,.25)');
        glow.addColorStop(1, 'rgba(255,200,80,0)');
        cCtx.beginPath();
        cCtx.arc(cx, 90, 28, 0, Math.PI * 2);
        cCtx.fillStyle = glow;
        cCtx.fill();
    });

    requestAnimationFrame(drawCake);
}
drawCake();


// ══ Toggle Switch ══
const toggleSwitch = document.getElementById('toggle-switch');
let isDay = false;

// เสียง
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;

function playToggleSound(toDay) {
    if (!audioCtx) audioCtx = new AudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (toDay) {
        // เสียงขึ้น — เหมือนดนตรีแฟนตาซี
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    } else {
        // เสียงลง
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(330, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
    }
    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
}

toggleSwitch.addEventListener('click', () => {
    isDay = !isDay;
    document.body.classList.toggle('day-mode', isDay);
    playToggleSound(isDay);

    // เพิ่มแค่ 3 บรรทัดนี้
    if (isDay) {
        setTimeout(() => {
            document.getElementById('switch-wrap').classList.add('hidden');
        }, 100); // รอให้ animation เค้กเริ่มก่อนแล้วค่อยซ่อน
    }
});