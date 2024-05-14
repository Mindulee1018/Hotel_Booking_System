import { useState, useEffect } from 'react';

const useReportData = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
        try {
            const response = await fetch('http://localhost:4000/user/users/report', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              }
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }

        const data = await response.json();
        setReportData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  return { reportData, loading, error };
};

export default useReportData;
