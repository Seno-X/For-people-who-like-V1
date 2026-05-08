const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const askText = document.getElementById('askText');

let yesScale = 1;

// ฟังก์ชันทำให้ปุ่ม "ไม่เป็น" วิ่งหนี
const runaway = () => {
    // คำนวณตำแหน่งใหม่แบบสุ่ม โดยไม่ให้ตกขอบจอ
    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // ปรับ style เป็น fixed เพื่อให้ไปได้ทั่วหน้าจอจริงๆ
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = '999'; /* อยู่เหนือทุกอย่าง */

    // --- ลูกเล่นเพิ่ม: ทำให้ปุ่ม YES ขยาย ---
    yesScale += 0.25; // ขยายทีละนิด
    yesBtn.style.transform = `scale(${yesScale})`;
}

// วิ่งหนีเมื่อเมาส์มาชี้ (สำหรับคอม)
noBtn.addEventListener('mouseover', runaway);
// วิ่งหนีเมื่อแตะ (สำหรับมือถือ)
noBtn.addEventListener('click', runaway);

// ฟังก์ชันเมื่อกดปุ่ม "เป็น" (ตกลง)
yesBtn.addEventListener('click', () => {
    // 1. เปลี่ยนข้อความถาม
    askText.innerHTML = "เย้! ❤️ รักกันนานๆ นะคนดี";
    
    // 2. ซ่อนปุ่ม "ไม่เป็น"
    noBtn.style.display = 'none';
    
    // 3. ปรับปุ่ม "เป็น" ให้กลับมาขนาดปกติและเปลี่ยนข้อความ
    yesBtn.style.transform = 'scale(1)';
    yesBtn.innerHTML = "รักที่สุดเลย!";
    yesBtn.style.backgroundColor = "#ff4757"; // สีแดงหัวใจ
    
    // 4. แจ้งเตือน
    alert("สถานะ: มีแฟนแล้ว 💖");
});
