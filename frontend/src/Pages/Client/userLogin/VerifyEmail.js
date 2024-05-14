import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VerifyEmail = () => {
  const { verifytoken } = useParams(); 
  const [verificationStatus, setVerificationStatus] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:4000/user/verify-email/:verifytoken`); 

        if (response.ok) {
          const data = await response.json();
          setVerificationStatus(data.message); 
        } else {
          const errorData = await response.json();
          setVerificationStatus(errorData.error || 'An error occurred during verification.');
        }
      } catch (error) {
        setVerificationStatus('An error occurred while verifying the email.');
      } finally {
        setLoading(false); 
      }
    };

    verifyEmail(); 
  }, [verifytoken]); 

  return (
    <div>
      <h1>Email Verification</h1>
      {loading ? (
        <p>Verifying...</p> 
      ) : (
        <p>{verificationStatus}</p> 
      )}
    </div>
  );
};

export default VerifyEmail; 
