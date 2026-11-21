# Pixel Love Kit 💕

ชุดเว็บพิกเซลสำหรับส่งให้คนพิเศษ สร้างเสร็จแล้วได้ลิงก์ไปแชร์ทันที ข้อมูลทั้งหมดเก็บอยู่ในลิงก์ (URL hash) ไม่ต้องมีเซิร์ฟเวอร์

| หน้า | ทำอะไร |
|---|---|
| `hub.html` | หน้ารวมทุกโปรเจกต์ |
| `index.html` | 💌 Love Letter: ถามคำถามสำคัญ ปุ่ม No วิ่งหนี |
| `countdown.html` | ⏳ Countdown: นับถอยหลังวันสำคัญ มีกล่องเซอร์ไพรส์เปิดได้วันละกล่อง |
| `game.html` | 🐱 Heart Catcher: เกมเก็บหัวใจ ครบแล้วเห็นข้อความลับ |
| `memories.html` | 📁 Memory Desktop: เดสก์ท็อปพิกเซลรวมความทรงจำ พร้อมสไลด์โชว์ |

`shared.css` / `shared.js` ใช้ร่วมกันโดย countdown, game, memories และ hub

## ใช้งาน
เปิด GitHub Pages (Settings → Pages → Deploy from branch) แล้วเข้า `hub.html`
หรือทดสอบในเครื่อง: `python3 -m http.server` แล้วเปิด http://localhost:8000/hub.html
