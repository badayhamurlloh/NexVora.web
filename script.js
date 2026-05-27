// Konfigurasi IP
const SERVER_IP = "nexvora.minecraftindonesial.my.id";

// Fungsi Copy IP
function copyIP() {
    navigator.clipboard.writeText(SERVER_IP);
    alert("✅ IP Berhasil disalin ke clipboard!");
}

// Fungsi Ambil Data Server
async function updateStatus() {
    try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`);
        const data = await response.json();
        
        const dot = document.getElementById('dot');
        const statusText = document.getElementById('status-text');
        const playerList = document.getElementById('player-list-container');
        
        // Sembunyikan Loader setelah data pertama masuk
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';

        if (data.online) {
            dot.className = 'dot-online';
            statusText.innerText = `ONLINE: ${data.players.online} / ${data.players.max}`;
            
            // Tampilkan list pemain jika ada
            if (data.players.list) {
                playerList.innerText = "Pemain: " + data.players.list.join(", ");
            } else {
                playerList.innerText = "Tidak ada pemain yang online.";
            }
        } else {
            dot.className = 'dot-offline';
            statusText.innerText = "SERVER OFFLINE";
            playerList.innerText = "";
        }
    } catch (error) {
        // Jika error, tetap hilangkan loader agar web terbuka
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        console.error("Gagal mengambil data server.");
    }
}

// Jalankan Fungsi
updateStatus();

// Update otomatis setiap 30 detik
setInterval(updateStatus, 30000);
