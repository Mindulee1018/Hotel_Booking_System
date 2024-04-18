// useManagerList.js
import { useState, useEffect } from 'react';

const useManagerList = () => {
  const [managerList, setManagerList] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [userList, setuserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagerAndStaffList = async () => {
      setIsLoading(true);
      try {
        // Fetch manager list
        const managerResponse = await fetch('http://localhost:4000/user/managers');
        if (!managerResponse.ok) {
          throw new Error('Failed to fetch manager list');
        }
        const managerData = await managerResponse.json();
        setManagerList(managerData);

        // Fetch staff list
        const staffResponse = await fetch('http://localhost:4000/user/staff');
        if (!staffResponse.ok) {
          throw new Error('Failed to fetch staff list');
        }
        const staffData = await staffResponse.json();
        setStaffList(staffData);


        const userResponse = await fetch('http://localhost:4000/user/users');
        if (!userResponse.ok) {
          throw new Error('Failed to fetch staff list');
        }
        const userData = await userResponse.json();
        setuserList(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchManagerAndStaffList();
  }, []);

  return { managerList, staffList,userList, isLoading, error };
};

export default useManagerList;
