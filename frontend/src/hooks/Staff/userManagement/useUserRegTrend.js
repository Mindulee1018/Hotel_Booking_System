
import { useState } from 'react';

const useRegistrationTrend = () => {
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRegistrationTrend = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:4000/user/registration-trend');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTrendData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return { trendData, loading, fetchRegistrationTrend };
};

export default useRegistrationTrend;
