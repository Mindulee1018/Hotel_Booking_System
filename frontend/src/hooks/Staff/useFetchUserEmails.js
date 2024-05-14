import { useState, useEffect } from 'react';

const useFetchUserEmails = () => {
    const [userEmails, setUserEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserEmails = async () => {
            try {
                const response = await fetch('http://localhost:4000/userEmails/emails');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserEmails(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserEmails();
    }, []);

    return { userEmails, loading, error };
};

export default useFetchUserEmails;
