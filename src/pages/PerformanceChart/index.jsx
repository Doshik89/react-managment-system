import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
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
import { Skeleton } from 'antd';
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
        const responseData = await response.json();

        const filteredData = Object.values(responseData).filter(
          entry => entry.req_count < 50
        );

        const employeeNames = filteredData.map(entry => entry.name);
        const reqCounts = filteredData.map(entry => entry.req_count);
        const reqCompleteCounts = filteredData.map(
          entry => entry.req_complete_count
        );
        const percentOfCompletes = filteredData.map(
          entry => entry.percent_of_complete
        );
        const avgTimes = filteredData.map(entry => entry.avg_time);
        const efficiencies = filteredData.map(entry => entry.eff);

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
              borderColor: 'rgba(255, 0, 255, 1)',
              backgroundColor: 'rgba(255, 0, 255, 0.2)',
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
              borderColor: 'rgba(0, 255, 0, 1)',
              backgroundColor: 'rgba(0, 255, 0, 0.2)',
              fill: true,
            },
            {
              label: 'Average execution time',
              data: avgTimes,
              borderColor: 'rgb(255, 0, 0, 1)',
              backgroundColor: 'rgba(255, 0, 0, 0.2)',
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

    return '';
  };

  return (
    <div className="chart-container">
      <div
        style={{
          textAlign: 'center',
          marginTop: '1rem',
        }}
      >
        <a href="https://autovaq.herokuapp.com/dwn" download>
          <Button
            style={{
              backgroundColor: '#00B0FF',
              color: '#fff',
              width: 150,
              height: 40,
              borderRadius: 5,
              textTransform: 'uppercase',
              fontWeight: 'bold',
              letterSpacing: 1,
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
            type="primary"
          >
            Export
          </Button>
        </a>
      </div>
      {data ? (
        <>
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
        </>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default ColumnDiagram;
