function updateChart() {
  const completed = tasks.filter(t => t.done).length;
  const remaining = tasks.length - completed;

  const data = {
    labels: ["Completed", "Remaining", "Sessions"],
    datasets: [{
      data: [completed, remaining, sessions]
    }]
  };

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("progressChart"), {
    type: "doughnut",
    data: data
  });
}
