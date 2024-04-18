
import { useState, useEffect } from 'react';

const useActivityList = () => {
  const [ActivityList, setActivityList] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      setIsLoading(true);
      try {
        // Fetch Activity list
        const ActivityResponse = await fetch('http://localhost:4000/Watersport/');
        if (!ActivityResponse.ok) {
          throw new Error('Failed to fetch Activity list');
        }
        const ActivityData = await ActivityResponse.json();
        setActivityList(ActivityData);
 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return { ActivityList, isLoading, error };
};

export default useActivityList;