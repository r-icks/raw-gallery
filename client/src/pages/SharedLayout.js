import React from 'react';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800">
      <Navbar />
      <div className="flex-1 px-5 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SharedLayout;