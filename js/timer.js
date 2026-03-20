let time = 1500;
let interval;

function startTimer() {
  if (interval) return;

  interval = setInterval(() => {
    if (time <= 0) {
      clearInterval(interval);
      alert("Done!");
      return;
    }
    time--;
    update();
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = 1500;
  update();
}

function update() {
  let m = Math.floor(time/60);
  let s = time % 60;
  document.getElementById("timer").textContent =
    `${m}:${s < 10 ? "0" : ""}${s}`;
}
