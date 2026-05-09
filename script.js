// ================= CONFIG =================
const MY_EMAIL = "no2553no2553@gmail.com"; 
// ==========================================

const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const askText = document.getElementById('askText');
const modal = document.getElementById('customModal');

let yesScale = 1;
let noScale = 1;

const runaway = () => {
    const padding = 50;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noScale -= 0.12; 
    if (noScale <= 0.1) {
        noBtn.style.visibility = 'hidden'; 
    }

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = `scale(${noScale})`;

    yesScale += 0.4;
    yesBtn.style.transform = `scale(${yesScale})`;
};

noBtn.addEventListener('mouseover', runaway);
noBtn.addEventListener('click', runaway);

yesBtn.addEventListener('click', () => {
    // 1. แสดงความสำเร็จทันที
    modal.style.display = 'flex';
    askText.innerHTML = "เย้! ❤️ รักกันนานๆ นะ";
    noBtn.style.display = 'none';
    yesBtn.style.display = 'none'; // ซ่อนปุ่มเดิมไปเลยหลังกด
    
    // 2. ส่งอีเมลแจ้งเตือนออโต้ (Background)
    fetch(`https://formsubmit.co/ajax/${MY_EMAIL}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            Subject: "💖 Mission Accomplished!",
            Message: "เขากดตกลงเป็นแฟนกับคุณแล้วนะ! ยินดีด้วยครับ 🎉",
        })
    });
});
