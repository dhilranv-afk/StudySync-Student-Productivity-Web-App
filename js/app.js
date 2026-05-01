import {
  db, collection, addDoc, getDocs,
  deleteDoc, updateDoc, doc, setDoc
} from "./js/firebase.js";

let tasks = [];
let history = {};
let chart;

/* ================= HELPERS ================= */
function getToday() {
  return new Date().toISOString().split("T")[0];
}

/* ================= LOAD ================= */
async function loadData() {
  const taskSnap = await getDocs(collection(db, "tasks"));
  tasks = taskSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  const histSnap = await getDocs(collection(db, "history"));
  history = {};
  histSnap.docs.forEach(d => history[d.id] = d.data());

  updateHistory();
  render();
}

/* ================= HISTORY ================= */
async function updateHistory() {
  const today = getToday();

  const completed = tasks.filter(t => t.done).length;
  const total = tasks.length;

  const current = history[today] || { sessions: 0 };

  await setDoc(doc(db, "history", today), {
    completed,
    total,
    sessions: current.sessions
  });

  history[today] = {
    completed,
    total,
    sessions: current.sessions
  };
}

/* ================= TASK CRUD ================= */
async function addTask(text) {
  await addDoc(collection(db, "tasks"), { text, done: false });
  loadData();
}

async function toggleTask(task) {
  await updateDoc(doc(db, "tasks", task.id), {
    done: !task.done
  });
  loadData();
}

async function deleteTask(task) {
  await deleteDoc(doc(db, "tasks", task.id));
  loadData();
}

/* ================= RENDER ================= */
function render() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${task.done ? "✅" : "⬜"} ${task.text}`;
    span.onclick = () => toggleTask(task);

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTask(task);

    li.append(span, btn);
    list.appendChild(li);
  });

  li.style.opacity = "0";
requestAnimationFrame(() => {
  li.style.transition = "0.3s";
  li.style.opacity = "1";
});

  updateChart();
  updateScore();
  updateInsights();
  updateHeatmap();
}

/* ================= CHART ================= */
function updateChart() {
  const today = history[getToday()] || { completed: 0, total: 0 };

  if (!chart) {
    chart = new Chart(document.getElementById("chart"), {
      type: "doughnut",
      data: {
        labels: ["Done", "Remaining"],
        datasets: [{
          data: [today.completed, today.total - today.completed]
        }]
      }
    });
  } else {
    chart.data.datasets[0].data = [
      today.completed,
      today.total - today.completed
    ];
    chart.update();
  }
}

/* ================= SCORE ================= */
function updateScore() {
  const today = history[getToday()] || { completed: 0, total: 0, sessions: 0 };

  let taskScore = today.total
    ? (today.completed / today.total) * 70
    : 0;

  let sessionScore = Math.min(today.sessions * 10, 30);

  const score = Math.round(taskScore + sessionScore);

  document.getElementById("score").innerText = score;
}

/* ================= INSIGHTS ================= */
function updateInsights() {
  const list = document.getElementById("insightsList");
  list.innerHTML = "";

  const today = history[getToday()] || { completed: 0 };
  const last7 = [];

  for (let i = 0; i < 7; i++) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    let key = d.toISOString().split("T")[0];
    last7.push(history[key]?.completed || 0);
  }

  const avg = last7.reduce((a,b)=>a+b,0)/7;

  let msg =
    today.completed > avg
      ? "🔥 Above weekly average"
      : today.completed === 0
      ? "⚠️ No progress today"
      : "📊 Slightly below average";

  const li = document.createElement("li");
  li.textContent = msg;
  list.appendChild(li);
}

/* ================= HEATMAP ================= */
function updateHeatmap() {
  const container = document.getElementById("heatmap");
  container.innerHTML = "";

  for (let i = 27; i >= 0; i--) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    let key = d.toISOString().split("T")[0];

    let val =
      (history[key]?.completed || 0) +
      (history[key]?.sessions || 0);

    let level = 0;
    if (val > 0) level = 1;
    if (val > 2) level = 2;
    if (val > 4) level = 3;
    if (val > 6) level = 4;

    const div = document.createElement("div");
    div.className = "day level-" + level;
    container.appendChild(div);
  }
}

/* ================= EXPORT ================= */
function exportCSV() {
  let csv = "Date,Completed,Total,Sessions\n";

  Object.keys(history).forEach(date => {
    const h = history[date];
    csv += `${date},${h.completed},${h.total},${h.sessions}\n`;
  });

  const blob = new Blob([csv]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "studysync.csv";
  a.click();
}

/* ================= TIMER ================= */
let time = 1500, interval;

function startTimer() {
  if (interval) return;

  document.getElementById("cup").classList.add("active");

  interval = setInterval(async () => {
    if (time <= 0) {
      clearInterval(interval);
      interval = null;

      const today = getToday();
      const current = history[today] || { sessions: 0 };

      await setDoc(doc(db, "history", today), {
        ...current,
        sessions: (current.sessions || 0) + 1
      });

      loadData();
      return;
    }

    time--;
    updateTimer();
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  time = 1500;
  updateTimer();
}

function updateTimer() {
  let m = Math.floor(time/60);
  let s = time%60;
  document.getElementById("timer").innerText =
    `${m}:${s.toString().padStart(2,"0")}`;
}

/* ================= EVENTS ================= */
document.getElementById("addBtn").onclick =
  () => addTask(document.getElementById("taskInput").value);

document.getElementById("exportBtn").onclick = exportCSV;
document.getElementById("startTimer").onclick = startTimer;
document.getElementById("resetTimer").onclick = resetTimer;
document.getElementById("darkToggle").onclick =
  () => document.body.classList.toggle("dark");

/* INIT */
loadData();
