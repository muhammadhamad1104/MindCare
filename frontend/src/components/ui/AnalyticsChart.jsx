import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnalyticsChart = ({ title, data, type = 'line', options = {} }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (canvasRef.current && data) {
      const ctx = canvasRef.current.getContext('2d');
      
      chartRef.current = new Chart(ctx, {
        type,
        data: {
          labels: data.labels,
          datasets: data.datasets.map(ds => ({
            ...ds,
            borderColor: ds.borderColor || '#3b82f6',
            backgroundColor: ds.backgroundColor || 'rgba(59, 130, 246, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: '#fff',
            pointBorderWidth: 2,
            fill: type === 'line'
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#6b7280',
                font: {
                  family: "'Inter', sans-serif"
                }
              }
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.9)',
              titleFont: {
                family: "'Inter', sans-serif"
              },
              bodyFont: {
                family: "'Inter', sans-serif"
              },
              padding: 12,
              cornerRadius: 6,
              displayColors: true
            }
          },
          scales: {
            x: {
              grid: {
                color: 'rgba(229, 231, 235, 0.5)'
              },
              ticks: {
                color: '#6b7280'
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(229, 231, 235, 0.5)'
              },
              ticks: {
                color: '#6b7280',
                callback: (value) => {
                  if (value >= 1000) return `${value/1000}k`;
                  return value;
                }
              }
            }
          },
          ...options
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data, type, options]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {title && (
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      )}
      
      <div className="h-80">
        <canvas ref={canvasRef} />
      </div>
      
      {data?.description && (
        <p className="text-gray-600 text-sm mt-4">
          {data.description}
        </p>
      )}
    </div>
  );
};

export default AnalyticsChart;