import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import './style.css';
import { loginUser, refreshAccessToken  } from '../api/auth';
import { useUser } from '../../context/UserContext';
import ForgotPassword from '../../scenes/resetPassword/ForgotPassword';
import axios from 'axios';


const registerUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3004/users/register', userData);
    return response.data; // You might want to handle response differently based on your backend's response structure
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

const Login = ({ onLogin }) => {
  const { login, isAuthenticated } = useUser();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [formMode, setFormMode] = useState('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailRegister, setEmailReg] = useState('');
  const [passwordRegister, setPasswordReg] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const refreshAccessTokenAndRedirect = async () => {
      if (isAuthenticated()) {
        const newAccessToken = await refreshAccessToken();

        if (!newAccessToken) {
          console.log('Failed to refresh access token. Redirect to login page.');
          navigate('/login');
        } else {
          navigate('/dashboard');
        }
      }
    };

    refreshAccessTokenAndRedirect();
  }, [isAuthenticated, navigate]);

  const redirectToDashboard = (userRole) => {
    let dashboardPath = '/';

    switch (userRole) {
      case 'admin':
        dashboardPath = '/dashboard';
        break;
      case 'resto':
        dashboardPath = '/ProfileResto';
        break;
      default:
        break;
    }

    navigate(dashboardPath);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ ...loginData }, navigate);
      const token = response?.token;

      if (response?.error) {
        setError(response.error);
      }

      if (token) {
        login({ token, id: response.id, role: response.role, name: response.name });
        redirectToDashboard(response.role);

        if (onLogin) {
          onLogin(token);
        }
      } else {
        console.warn('Token not present in the response:', response);
        setError('Login failed. Please verify your email and password.');
      }

      if (response?.body) {
        console.log('Response Body:', response.body);
      } else {
        console.warn('Response body not present in the response:', response);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Create an object containing registration form data
      const userData = {
        prenom: firstName,
        nom: lastName,
        email: emailRegister,
        password: passwordRegister,
        confirmPassword: confirmPassword,
      };

      // Call the API registration function with the form data
      const response = await registerUser(userData);

      // Handle API response if necessary
      console.log('User registered successfully:', response);

      // Redirect the user to a success page or perform other necessary actions
      navigate('/login');
    } catch (error) {
      // Handle error if registration fails
      console.error('Error registering user:', error);
      // Display an error message to the user or perform other necessary actions
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        {formMode === 'login' ? (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto my-auto">
            <h1 className="text-2xl mb-4">Connexion</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                  style={{ color: 'black' }}
                />
                <FaUser className="absolute text-gray-500 right-2 top-3" />
              </div>
              {error && <span className='error'>Error</span>}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Mot de passe"
                  onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                  style={{ color: 'black' }}
                />
                <FaLock className="absolute text-gray-500 right-2 top-3" />
              </div>
              {error && <span className='error'>Error</span>}
              </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remember">
                <input className="mr-2 leading-tight" type="checkbox" id="remember" />
                <span className="text-sm">Se rappeler de moi</span>
              </label>
              <p className="text-xs">
                <Link to="/forgotpassword" className="text-blue-500 hover:underline">
                  Mot de passe oublié ?
                </Link>
              </p>
            </div>
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline wider-button"
              style={{ width: '40%' }}
              type="button"
              onClick={handleLogin}
            >
              Connexion
            </button>
            <div className="mt-4">
              <p style={{ color: 'black' }}>
                Vous n’avez pas de compte ?{' '}
                <span className="cursor-pointer text-blue-500" onClick={() => setFormMode('signin')}>
                  <Link to="/CheckEmail"> Register</Link>
                </span>
              </p>
            </div>
          </div>
        ) : (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto my-auto">
            <h1 className="text-2xl mb-4">Inscription</h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                Prénom
              </label>
              <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="firstName"
      type="text"
      placeholder="Prénom"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      style={{ color: 'black' }}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
      Nom
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="lastName"
      type="text"
      placeholder="Nom"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      style={{ color: 'black' }}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailRegister">
      E-mail
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="emailRegister"
      type="email"
      placeholder="E-mail"
      value={emailRegister}
      onChange={(e) => setEmailReg(e.target.value)}
      style={{ color: 'black' }}
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordRegister">
      Mot de passe
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="passwordRegister"
      type="password"
      placeholder="Mot de passe"
      value={passwordRegister}
      onChange={(e) => setPasswordReg(e.target.value)}
      style={{ color: 'black' }}
    />
  </div>
  <div className="mb-6">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
      Confirmer le mot de passe 
    </label>
    <input
      className="shadow appearance-none text-black border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      id="confirmPassword"
      type="password"
      placeholder="Confirmer le mot de passe"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      style={{ color: 'black' }}
    />
  </div>
  <button
    className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
    style={{ width: '40%' }}
    onClick={handleRegister}
  >
    S'inscrire
  </button>
  <div className="mt-4">
    {formMode !== 'login' && (
      <p style={{ color: 'black' }}>
        Vous avez déjà un compte ?{' '}
        <span className="cursor-pointer text-blue-500" onClick={() => setFormMode('login')}>
          <Link to="/CheckEmail">Connectez-vous</Link>
        </span>
      </p>
    )}
  </div>
</form>
        )}
      </div>
    </div>
  );
};

export default Login;
