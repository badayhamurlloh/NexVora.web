const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 50, msg: "Cinta adalah memberi." };
let joy = { x: 0, y: 0 };

// Logika Input Analog (Sederhana)
document.getElementById("joystick").addEventListener("touchmove", (e) => {
    let touch = e.touches[0];
    player.x = touch.clientX - 25;
    player.y = touch.clientY - 25;
});

// Logika Tombol
document.getElementById("btnLove").onclick = () => {
    alert(player.msg);
};

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Gambar Karakter
    ctx.fillStyle = "pink";
    ctx.fillRect(player.x, player.y, 50, 50);
    
    // Teks Naratif
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Jelajahi arti cinta...", 20, 30);
    
    requestAnimationFrame(update);
}

update();
