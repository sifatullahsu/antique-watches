import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";
import { AuthContext } from '../contexts/AuthContextComp';
import toast from 'react-hot-toast';
import logo from '../assets/images/logo.png';

const Header = () => {

  const { user, userLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUserLogout = () => {
    userLogout()
      .then(result => {
        toast.success('Logout successfull..');
        navigate('/login');
      })
      .catch(err => {
        toast.error('Somthing is wrong..')
        console.log(err);
      })
  }

  const menu = () => {
    return (
      <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/shop'>Shop</Link></li>
        <li><Link to='/categories'>Categories</Link></li>
        <li><Link to='/blog'>Blog</Link></li>
        {
          user?.uid ?
            <>
              <li>
                <Link to='/dashboard'>Dashboard</Link>
              </li>
              <li><button onClick={handleUserLogout}>Logout</button></li>
            </>
            :
            <>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/register'>Register</Link></li>
            </>
        }
      </>
    );
  }

  return (
    <header className='bg-neutral text-base-100'>
      <div className="navbar container">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden"><FaBars></FaBars></label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content bg-primary mt-3 p-2 shadow  rounded-box w-52">{menu()}</ul>
          </div>
          <div>
            <Link to="/" className="btn btn-ghost w-[180px]">
              <img src={logo} className='w-full' alt="" />
            </Link>
          </div>
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