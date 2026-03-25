// Import tasks.js and timer.js

import { addTask } from "./tasks.js";
import { startTimer, resetTimer } from "./timer.js";

window.addTask = addTask;
window.startTimer = startTimer;
window.resetTimer = resetTimer;

// Assignments Array
let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

// Create Assignment Form
const form = document.getElementById("assignmentForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const course = document.getElementById("course").value;
        const dueDate = document.getElementById("dueDate").value;
        const importance = document.getElementById("importance").value;
        const creator = document.getElementById("creator").value;

        const newAssignment = {
            title: title,
            course: course,
            dueDate: dueDate,
            importance: importance,
            creator: creator,
            progress: 0
        };

        assignments.push(newAssignment);

        localStorage.setItem("assignments", JSON.stringify(assignments));

        document.getElementById("message").textContent = "Assignment saved sucessfully";

        form.reset();
    });
}