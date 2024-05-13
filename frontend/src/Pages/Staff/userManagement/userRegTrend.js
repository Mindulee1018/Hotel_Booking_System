
import React from 'react';
import useRegistrationTrend from '.././../../hooks/Staff/userManagement/useUserRegTrend';

const RegistrationTrendPage = () => {
  const { trendData, loading, fetchRegistrationTrend } = useRegistrationTrend();

  const generatePDF = () => {
    // PDF generation logic here
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Registration Trend Report</h1>
      <button className="btn btn-primary mr-2" onClick={fetchRegistrationTrend} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Registration Trend'}
      </button>
      <button className="btn btn-success" onClick={generatePDF} disabled={trendData.length === 0}>
        Generate PDF Report
      </button>
      <ul className="list-group mt-4">
        {trendData.map((data, index) => (
          <li key={index} className="list-group-item">
            {data._id.year}-{data._id.month}-{data._id.day}: {data.registrations}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrationTrendPage;
