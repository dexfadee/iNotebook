import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {

  const [navList, setnavList] = useState('hidden');
  const [state, setState] = useState('light');

  const handleDark = () => {
    if (state === "dark") {
      document.querySelector('html').classList.add('dark');
      setState("light");
      document.documentElement.style.cssText = "--theme: #111827";
    }
    else {
      document.querySelector('html').classList.remove('dark');
      setState("dark");
      document.documentElement.style.cssText = "--theme: white";
    }
  }

  const showMenu = () => {
    navList === 'hidden' ? setnavList('absolute') : setnavList('hidden');
  }

  const logout = () => {
    localStorage.removeItem('token');
    props.showAlert('Logged Out Successfully!');
  }

  return (
    <>

      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

          <Link to="#" className="flex items-center">
            <img src={props.logo} className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">iNotebook</span>
          </ Link>

          <div className='flex gap-2 items-center'>

            <button data-collapse-toggle="navbar-default" type="button" className="order-2 inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" onClick={showMenu}>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>

            <div className="flex w-9 h-9 order-0 mx-2">
              <img src={props.dark} alt="Dark Mode" className='dark:invert hover:cursor-pointer ' onClick={handleDark} />
            </div>

            {!localStorage.getItem('token')?<><Link to="/login" className="hidden xl:inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</Link><Link to="/signup" className="hidden xl:inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">SignUp</Link></> : <Link to="/login" className="hidden xl:inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={logout}>Logout</Link>}
          </div>

        </div>
      </nav>

    </>
  )
}

export default Navbar