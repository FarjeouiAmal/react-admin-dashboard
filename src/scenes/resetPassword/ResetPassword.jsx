// ResetPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import '../../components/Login/style.css'; // Assurez-vous d'importer le même fichier style.css utilisé pour le formulaire de connexion

const ResetPassword = () => {
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('');

  const handleResetPassword = () => {
    // Implémentez votre logique de réinitialisation du mot de passe ici
    console.log('Réinitialisation du mot de passe...');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto my-auto">
      <div style={{ width: '100%' }}>
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Réinitialiser le mot de passe</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nouveauMotDePasse">
            Nouveau Mot de Passe
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="nouveauMotDePasse"
              type="password"
              placeholder="Nouveau Mot de Passe"
              value={nouveauMotDePasse}
              onChange={(e) => setNouveauMotDePasse(e.target.value)}
            />
            <FaLock className="absolute text-gray-700 right-2 top-3" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmerMotDePasse">
            Confirmer le Mot de Passe
          </label>
          <div className="relative">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmerMotDePasse"
              type="password"
              placeholder="Confirmer le Mot de Passe"
              value={confirmerMotDePasse}
              onChange={(e) => setConfirmerMotDePasse(e.target.value)}
            />
            <FaLock className="absolute text-gray-500 right-2 top-3" />
          </div>
        </div>
        <Link to="/Login">
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline wider-button"
            style={{ width: '50%' }}
            type="button"
            onClick={handleResetPassword}
          >
            Réinitialiser le Mot de Passe
          </button>
        </Link>
      </div>
      </form>
    </div>
    </div>
  );
};

export default ResetPassword;
