
document.addEventListener("DOMContentLoaded", () => {
  const audio = new Audio("audio/sea sound.mp3"); 
  audio.loop = true;

  const savedTime = parseFloat(localStorage.getItem("audioTime")) || 0;
  const isPlaying = localStorage.getItem("audioPlaying") === "true";

  audio.currentTime = savedTime;

  if (isPlaying) {
    audio.play().catch(() => {});
  }

  setInterval(() => {
    localStorage.setItem("audioTime", audio.currentTime);
  }, 1000);

  const nav = document.querySelector('.navbar-nav');
  if (nav) {
    const li = document.createElement('li');
    li.className = 'nav-item';

    const btn = document.createElement('button');
    btn.className = 'btn btn-sm btn-warning ms-2';
    btn.innerHTML = isPlaying ? '🔇 ' : '🔊';

    li.appendChild(btn);
    nav.appendChild(li);

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        btn.innerHTML = ' 🔊';
        localStorage.setItem("audioPlaying", "true");
      } else {
        audio.pause();
        btn.innerHTML = '🔇';
        localStorage.setItem("audioPlaying", "false");
      }
    });
  }
});
