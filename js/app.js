import { db, collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "./firebase.js";

let tasks = [];
const list = document.getElementById("taskList");

export async function loadTasks() {
  const snap = await getDocs(collection(db, "tasks"));
  tasks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  render();
}

window.handleAddTask = async function () {
  const input = document.getElementById("taskInput");
  if (!input.value) return;

  await addDoc(collection(db, "tasks"), {
    text: input.value,
    done: false
  });

  input.value = "";
  loadTasks();
};

window.toggleTask = async function (task) {
  await updateDoc(doc(db, "tasks", task.id), {
    done: !task.done
  });
  loadTasks();
};

window.deleteTask = async function (task) {
  await deleteDoc(doc(db, "tasks", task.id));
  loadTasks();
};

function render() {
  list.innerHTML = "";

  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${t.done ? "✅" : "⬜"} ${t.text}</span>
      <button onclick='deleteTask(${JSON.stringify(t)})'>❌</button>
    `;
    li.onclick = () => toggleTask(t);
    list.appendChild(li);
  });

  updateChart();
  updateScore();
  generateInsightsUI();
  generateHeatmap();
}

/* TIMER */
let time = 1500, interval;

window.startTimer = function () {
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
};

window.resetTimer = function () {
  clearInterval(interval);
  interval = null;
  time = 1500;
  updateTimer();
};

function updateTimer() {
  let m = Math.floor(time/60);
  let s = time%60;
  document.getElementById("timer").innerText = `${m}:${s}`;
}

window.toggleDark = function () {
  document.body.classList.toggle("dark");
};

loadTasks();
