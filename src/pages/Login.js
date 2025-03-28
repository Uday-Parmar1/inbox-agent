import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log('Google login clicked');
  };

  const handleMicrosoftLogin = () => {
    // TODO: Implement Microsoft OAuth
    console.log('Microsoft login clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <EnvelopeIcon className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to InboxAgent
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your AI-powered job application tracker
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Continue with Google
            </button>

            <button
              onClick={handleMicrosoftLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue with Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 