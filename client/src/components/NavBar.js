import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiImageAddLine } from 'react-icons/ri';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-green-500 p-2 text-white font-bold z-10">
      <NavLink to="/" className="flex items-center justify-center">
        <span className="text-3xl my-2">Photos</span>
        <RiImageAddLine className="ml-2 text-3xl" />
      </NavLink>
    </nav>
  );
};

export default Navbar;