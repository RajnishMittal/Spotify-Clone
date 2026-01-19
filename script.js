import { songs } from "./songs.js";
console.log("Script loaded");

const songBox = document.querySelector(".song_name");

function display_songs() {
    songBox.innerHTML = "";

    songs.forEach((song, index) => {
        const div = document.createElement("div");
        div.classList.add("song-item");

        div.innerHTML = `
            <div class="title">${song.title}</div>
            <div class="artist">${song.artist}</div>
        `;

        div.onclick = () => play_song(song.src, index);

        songBox.appendChild(div);
    });
}
let currentIndex = 0;
let audio = new Audio(songs[currentIndex].src);


function play_song(src, index) {
    currentIndex = index;
    audio.src = src;
    audio.play();
    playBtn.src = "icons/Pause.png";
}


const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.src = "icons/Pause.png";   // show pause image
    } else {
        audio.pause();
        playBtn.src = "icons/play.svg";    // show play image
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;   // loop next
    audio.src = songs[currentIndex].src;
    audio.play();
    playBtn.src = "icons/Pause.png";
});


document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    audio.src = songs[currentIndex].src;
    audio.play();
    playBtn.innerText = "icons/Pause.png";
});


document.getElementById("volumeSlider").addEventListener("input", (e) => {
    audio.volume = e.target.value; 
});


const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const seekBar = document.getElementById("seekBar");


function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, "0")}`;
}


audio.addEventListener("loadedmetadata", () => {
    totalTimeEl.textContent = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
});


audio.addEventListener("timeupdate", () => {
    seekBar.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});


seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});


display_songs();
