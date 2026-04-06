export function addTask() {
  const input = document.getElementById("taskInput");
  const li = document.createElement("li");
  li.textContent = input.value;

  li.onclick = () => li.style.textDecoration = "line-through";

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}
