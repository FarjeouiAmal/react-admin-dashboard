import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import '../../components/Login/style.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://localhost:3004/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Password reset initiated successfully');
        // Redirect or show success message
      } else {
        console.error('Failed to initiate password reset');
        // Handle error, show message or redirect
      }
    } catch (error) {
      console.error('Error initiating password reset:', error);
    }
  };
  

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="w-full max-w-md">
   <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto my-auto">
 <div style={{ width: '100%' }}>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Vérification de l'E-mail</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              E-mail
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaUser className="absolute text-gray-500 right-2 top-3" />
            </div>
          </div>
          <Link to="/ResetPassword">
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline wider-button"
              style={{ width: '40%' }}
              type="button"
              onClick={handleForgotPassword}
            >
              Vérifier
            </button>
          </Link>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default ForgotPassword;
