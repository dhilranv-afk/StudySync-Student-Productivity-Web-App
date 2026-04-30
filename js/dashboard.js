let chart;

function getStats() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return {
    done: tasks.filter(t=>t.done).length,
    total: tasks.length
  };
}

function createChart() {
  const ctx = document.getElementById("chart");
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Done", "Remaining"],
      datasets: [{
        data: [0,0]
      }]
    }
  });
}

function updateChart() {
  if (!chart) createChart();
  let s = getStats();
  chart.data.datasets[0].data = [s.done, s.total - s.done];
  chart.update();
}

/* SCORE */
function updateScore() {
  document.getElementById("score").innerText =
    Math.floor(Math.random()*100);
}

/* INSIGHTS */
function generateInsightsUI() {
  const list = document.getElementById("insightsList");
  list.innerHTML = "<li>Keep going 🚀</li>";
}

/* HEATMAP */
function generateHeatmap() {
  const container = document.getElementById("heatmap");
  container.innerHTML = "";

  for (let i=0;i<28;i++) {
    const div = document.createElement("div");
    div.className = "day level-" + Math.floor(Math.random()*5);
    container.appendChild(div);
  }
}

/* EXPORT */
window.exportCSV = function () {
  let data = "Sample export";
  const blob = new Blob([data]);
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.csv";
  a.click();
};
