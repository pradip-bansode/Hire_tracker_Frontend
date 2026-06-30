import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {user , logout}= useAuth();
  const navigate = useNavigate();

   const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <div>
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-wide">
                Hire Tracker
            </h1>

           {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-blue-100">
              {user.name}
            </span>
            <button onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-50">
              Logout
            </button>
          </div>
        )}

      </div>
    </nav>
    </div>
  );
};

export default Navbar;
