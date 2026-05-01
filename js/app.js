import {
  db, collection, addDoc, getDocs,
  deleteDoc, updateDoc, doc
} from "./js/firebase.js";

let tasks = [];
let chart;

// DOM
const list = document.getElementById("taskList");
const input = document.getElementById("taskInput");

/* ================= LOAD ================= */
async function loadTasks() {
  try {
    const snap = await getDocs(collection(db, "tasks"));
    tasks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    render();
  } catch (err) {
    console.error(err);
  }
}

/* ================= ADD ================= */
async function addTask() {
  if (!input.value.trim()) return;

  await addDoc(collection(db, "tasks"), {
    text: input.value,
    done: false
  });

  input.value = "";
  loadTasks();
}

/* ================= TOGGLE ================= */
async function toggleTask(task) {
  await updateDoc(doc(db, "tasks", task.id), {
    done: !task.done
  });
  loadTasks();
}

/* ================= DELETE ================= */
async function deleteTask(task) {
  await deleteDoc(doc(db, "tasks", task.id));
  loadTasks();
}

/* ================= RENDER ================= */
function render() {
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = `${task.done ? "✅" : "⬜"} ${task.text}`;
    span.onclick = () => toggleTask(task);

    const btn = document.createElement("button");
    btn.textContent = "❌";
    btn.onclick = () => deleteTask(task);

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });

  updateChart();
  updateScore();
  updateInsights();
  updateHeatmap();
}

/* ================= CHART ================= */
function updateChart() {
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;

  if (!chart) {
    chart = new Chart(document.getElementById("chart"), {
      type: "doughnut",
      data: {
        labels: ["Done", "Remaining"],
        datasets: [{ data: [done, total - done] }]
      }
    });
  } else {
    chart.data.datasets[0].data = [done, total - done];
    chart.update();
  }
}

/* ================= SCORE ================= */
function updateScore() {
  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;
  const score = total ? Math.round((done / total) * 100) : 0;

  document.getElementById("score").innerText = score;
}

/* ================= INSIGHTS ================= */
function updateInsights() {
  const list = document.getElementById("insightsList");
  list.innerHTML = "";

  const done = tasks.filter(t => t.done).length;

  let msg = done === 0
    ? "Start small today 🚀"
    : done > 3
    ? "Great productivity 🔥"
    : "Keep going 💪";

  const li = document.createElement("li");
  li.textContent = msg;
  list.appendChild(li);
}

/* ================= HEATMAP ================= */
function updateHeatmap() {
  const container = document.getElementById("heatmap");
  container.innerHTML = "";

  for (let i = 0; i < 28; i++) {
    const div = document.createElement("div");
    div.className = "day level-" + Math.floor(Math.random()*4);
    container.appendChild(div);
  }
}

/* ================= EXPORT ================= */
function exportCSV() {
  let csv = "Task,Status\n";
  tasks.forEach(t => {
    csv += `${t.text},${t.done}\n`;
  });

  const blob = new Blob([csv]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "tasks.csv";
  a.click();
}

/* ================= TIMER ================= */
let time = 1500, interval;

function startTimer() {
  if (interval) return;

  document.getElementById("cup").classList.add("active");

  interval = setInterval(() => {
    if (time <= 0) {
      clearInterval(interval);
      interval = null;
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
document.getElementById("addBtn").onclick = addTask;
document.getElementById("exportBtn").onclick = exportCSV;
document.getElementById("startTimer").onclick = startTimer;
document.getElementById("resetTimer").onclick = resetTimer;
document.getElementById("darkToggle").onclick =
  () => document.body.classList.toggle("dark");

/* INIT */
loadTasks();
