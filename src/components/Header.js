import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

const Header = () => {

  const menu = () => {
    return (
      <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
        <li><Link to='/dasgboard'>Dashboard</Link></li>
      </>
    );
  }

  return (
    <header className='bg-primary text-base-100'>
      <div className="navbar container">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden"><FaBars></FaBars></label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow  rounded-box w-52">{menu()}</ul>
          </div>
          <Link to="/" className="btn btn-ghost normal-case text-xl">Antique Watches</Link>
        </div>
        <div className="navbar-end">
          <div className='hidden lg:flex'>
            <ul className="menu menu-horizontal p-0">{menu()}</ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;