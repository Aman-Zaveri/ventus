export function createChart(xAxis, yAxis, myChart, color) {
  const data = {
    labels: xAxis,
    datasets: [
      {
        label: "Weekly Sales",
        data: yAxis,
        backgroundColor: "#bae6fd",
        borderColor: "#38bdf8",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 0,
      },
    ],
  };

  if (myChart) {
    myChart.destroy();
  }

  // config
  myChart = new Chart(document.getElementById("lineChart").getContext("2d"), {
    type: "line",
    data,
    plugins: [ChartDataLabels],
    options: {
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          display: false,
        },
        datalabels: {
          color: color,
          anchor: "end",
          align: "end",
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          grace: 3,
        },
        x: {
          ticks: {
            color: color,
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
    },
  });

  // render init block
  myChart.update();

  return myChart;
}
