// Import tasks.js and timer.js

// bug tester


//window.addTask = addTask;
//window.startTimer = startTimer;
//window.resetTimer = resetTimer;

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

console.log(form);

//Show assignments on homepage

function displayAssignments() {

  const upcoming = document.getElementById("upcomingAssignments");
  const past = document.getElementById("pastAssignments");

  if (!upcoming || !past) return;

  upcoming.innerHTML = "";
  past.innerHTML = "";

  for (let i = 0; i < assignments.length; i++) {

    const a = assignments[i];

    const card = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = a.title;

    const course = document.createElement("p");
    course.textContent = a.course;

    const date = document.createElement("p");
    date.textContent = "Due: " + a.dueDate;

    card.appendChild(title);
    card.appendChild(course);
    card.appendChild(date);

    const today = new Date();
    const due = new Date(a.dueDate);

    if (due >= today) {
      upcoming.appendChild(card);
    } else {
      past.appendChild(card);
    }

  }
}

displayAssignments();