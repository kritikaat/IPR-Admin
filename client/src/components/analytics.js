import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/analytics')
      .then(response => response.json())
      .then(data => {
        setAnalyticsData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics data');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div>{error}</div>;
  if (!analyticsData || !analyticsData.commonMaterials || !analyticsData.preferredTimings) {
    return <div>No analytics data available</div>;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 20,
          font: {
            size: 14
          },
          padding: 20
        }
      },
      title: {
        display: true,
        font: {
          size: 18,
          weight: 'bold'
        },
        padding: 20
      },
      tooltip: {
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 16
        }
      }
    }
  };

  const materialChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        position: 'right',
        labels: {
          ...chartOptions.plugins.legend.labels,
          font: {
            size: 12
          },
          boxWidth: 15,
          padding: 15
        }
      }
    }
  };

  const totalFormsData = {
    labels: ['Submitted Forms'],
    datasets: [{
      label: 'Forms',
      data: [analyticsData.totalForms],
      backgroundColor: '#4BC0C0',
    }]
  };

  const materialData = {
    labels: analyticsData.commonMaterials.map(item => item.materials),
    datasets: [{
      data: analyticsData.commonMaterials.map(item => item.count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
    }]
  };

  const timingData = {
    labels: analyticsData.preferredTimings.map(item => item.visit_time),
    datasets: [{
      label: 'Visit Count',
      data: analyticsData.preferredTimings.map(item => item.count),
      backgroundColor: '#36A2EB',
    }]
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px', fontSize: '28px',  fontWeight: 'bold'}}>Form Analytics Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '22px' }}>Total Forms Submitted</h3>
          <div style={{ height: '300px' }}>
            <Bar data={totalFormsData} options={{...chartOptions, plugins: {...chartOptions.plugins, title: {...chartOptions.plugins.title, text: 'Form Submissions'}}}} />
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '22px' }}>Avg Group Size</h3>
          <div style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '64px', fontWeight: 'bold', color: '#FFCE56' }}>{parseFloat(analyticsData.avgGroupSize).toFixed(2)}</span>
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', gridColumn: 'span 2' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '22px' }}>Common Materials</h3>
          <div style={{ height: '400px' }}>
            <Pie data={materialData} options={{...materialChartOptions, plugins: {...materialChartOptions.plugins, title: {...materialChartOptions.plugins.title, text: 'Material Usage'}}}} />
          </div>
        </div>
        <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', gridColumn: 'span 2' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '22px' }}>Preferred Timings</h3>
          <div style={{ height: '300px' }}>
            <Bar data={timingData} options={{...chartOptions, plugins: {...chartOptions.plugins, title: {...chartOptions.plugins.title, text: 'Visit Time Preferences'}}}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
