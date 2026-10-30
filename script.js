// قلب‌های شناور تزئینی؛ بدون نیاز به کتابخانه
    const symbols = ['♡','♥','❤','ღ'];
    for (let i = 0; i < 18; i++) {
      const heart = document.createElement('span');
      heart.className = 'floating-heart';
      heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = (14 + Math.random() * 20) + 'px';
      heart.style.animationDuration = (12 + Math.random() * 15) + 's';
      heart.style.animationDelay = (-Math.random() * 24) + 's';
      document.body.appendChild(heart);
    }

    
const loveSong = document.getElementById("loveSong");
const musicToggle = document.getElementById("musicToggle");
const musicStatus = document.getElementById("musicStatus");
const musicProgress = document.getElementById("musicProgress");
const musicCurrent = document.getElementById("musicCurrent");
const musicDuration = document.getElementById("musicDuration");

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function updateMusicState(isPlaying) {
  musicToggle.classList.toggle("is-playing", isPlaying);
  musicToggle.setAttribute("aria-pressed", String(isPlaying));
  musicToggle.setAttribute(
    "aria-label",
    isPlaying ? "توقف آهنگ" : "پخش آهنگ"
  );

  musicStatus.textContent = isPlaying
    ? "در حال پخش، تقدیم به تو ♡"
    : "برای شنیدن آهنگ روی قلب بزن";
}

musicToggle.addEventListener("click", async () => {
  if (loveSong.paused) {
    try {
      await loveSong.play();
    } catch (error) {
      musicStatus.textContent =
        "پخش نشد؛ وجود فایل MP3 و نام آن را بررسی کن.";
    }
  } else {
    loveSong.pause();
  }
});

loveSong.addEventListener("play", () => updateMusicState(true));
loveSong.addEventListener("pause", () => updateMusicState(false));

loveSong.addEventListener("loadedmetadata", () => {
  musicDuration.textContent = formatTime(loveSong.duration);
});

loveSong.addEventListener("timeupdate", () => {
  musicCurrent.textContent = formatTime(loveSong.currentTime);

  if (Number.isFinite(loveSong.duration) && loveSong.duration > 0) {
    musicProgress.value =
      (loveSong.currentTime / loveSong.duration) * 100;
  }
});

musicProgress.addEventListener("input", () => {
  if (Number.isFinite(loveSong.duration) && loveSong.duration > 0) {
    loveSong.currentTime =
      (Number(musicProgress.value) / 100) * loveSong.duration;
  }
});

loveSong.addEventListener("ended", () => {
  // اگر بخواهی آهنگ پس از پایان خودکار از ابتدا شروع شود،
  // ویژگی loop را در تگ audio اضافه کن.
  updateMusicState(false);
});

loveSong.addEventListener("error", () => {
  musicStatus.textContent =
    "فایل آهنگ پیدا نشد یا فرمت آن قابل پخش نیست.";
});
