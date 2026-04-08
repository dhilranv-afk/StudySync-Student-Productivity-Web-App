let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.done) {
      li.style.textDecoration = "line-through";
    }

    li.onclick = () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
      updateChart();
    };

    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");

  tasks.push({ text: input.value, done: false });
  input.value = "";

  saveTasks();
  renderTasks();
  updateChart();
}

window.onload = renderTasks;
