import React, { useEffect, useState } from 'react';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Filler,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './chart.css';

const ColumnDiagram = () => {
  const [data, setData] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://autovaq.herokuapp.com/an/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();

        const employeeNames = Object.values(data).map(entry => entry.name);
        const reqCounts = Object.values(data).map(entry => entry.req_count);
        const reqCompleteCounts = Object.values(data).map(
          entry => entry.req_complete_count
        );
        const percentOfCompletes = Object.values(data).map(
          entry => entry.percent_of_complete
        );
        const avgTimes = Object.values(data).map(entry => entry.avg_time);
        const efficiencies = Object.values(data).map(entry => entry.eff);

        Chart.register(
          CategoryScale,
          LinearScale,
          PointElement,
          LineElement,
          BarElement,
          Filler,
          Tooltip
        );

        setData({
          labels: employeeNames,
          datasets: [
            {
              label: 'Number of requests',
              data: reqCounts,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              fill: true,
            },
            {
              label: 'Number of completed',
              data: reqCompleteCounts,
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              fill: true,
            },
            {
              label: 'Percentage of completed',
              data: percentOfCompletes,
              borderColor: 'rgba(255, 206, 86, 1)',
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              fill: true,
            },
            {
              label: 'Average execution time',
              data: avgTimes,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
            {
              label: 'Efficiency',
              data: efficiencies,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: true,
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const labelCallback = context => {
    const label = context.chart.data.datasets[context.datasetIndex].label;
    const value = context.parsed.y;

    if (typeof value !== 'undefined') {
      return `${label}: ${value}`;
    }

    return 'Gay';
  };

  return (
    <div>
      {data ? (
        <Bar
          key={data}
          data={data}
          options={{
            scales: {
              x: {
                type: 'category',
                offset: true,
                title: {
                  display: true,
                  text: 'Employee Names',
                  color: 'black',
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Values',
                  color: 'black',
                },
                ticks: {
                  callback: value => `${value}`,
                },
              },
            },
            plugins: {
              filler: {
                propagate: false,
                tooltip: {
                  enabled: true,
                  callbacks: {
                    label: labelCallback,
                  },
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ColumnDiagram;
