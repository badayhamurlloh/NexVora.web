// --- KONFIGURASI & STATUS SERVER ---

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


// --- LOGIKA CAROUSEL ---

let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)

function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}
