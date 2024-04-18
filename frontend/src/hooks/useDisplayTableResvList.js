import { useState, useEffect } from 'react';

const useDisplayTableList = () => {
  const [TableList, setTableList] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTable = async () => {
      setIsLoading(true);
      try {
        // Fetch Table list
        const Response = await fetch("http://localhost:4000/table/");
        if (!Response.ok) {
          throw new Error('Failed to fetch Table list');
        }
        let Data = await Response.json();
        setTableList(Data);
 
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTable();
  }, []);

  return { TableList, isLoading, error };
};

export default useDisplayTableList;