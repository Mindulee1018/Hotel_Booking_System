import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'

const NewHallDash = () => {
  const sidebarRef = useRef(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebarVisibility = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const handleSideMenuClick = () => {
      if (sidebarRef.current) {
        setSidebarVisible(!sidebarVisible);
      }
    };

    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    if (menuBar) {
      menuBar.addEventListener('click', handleSideMenuClick);
    }

    return () => {
      if (menuBar) {
        menuBar.removeEventListener('click', handleSideMenuClick);
      }
    };
  }, [sidebarVisible]); // Re-run effect when sidebar visibility changes

  return (
    <>
      {/* Toggle Button */}
      
      
      {/* SIDEBAR */}
      <section id="sidebar" ref={sidebarRef} className={sidebarVisible ? '' : 'hide'}>
        <div className="d-flex justify-content-end">
      <button onClick={toggleSidebarVisibility} className="toggle-button btn btn-light toggle-button">
          <FontAwesomeIcon icon={faBars} />
        </button>
        </div >
        <Link to="/" className="brand">
          <i className='bx bxs-smile'></i>
          <span className="text">Sunset Araliya Resourt</span>
        </Link>
        <ul className="side-menu top">
          <li className="active">
            <Link to="#">
              <i className='bx bxs-dashboard'></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Venues</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className='bx bxs-doughnut-chart'></i>
              <span className="text">Calendar</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className='bx bxs-message-dots'></i>
              <span className="text">Reservation</span>
            </Link>
          </li>
          <li>
            <Link to="#">
              <i className='bx bxs-group'></i>
              <span className="text">Resources</span>
            </Link>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <Link to="#">
              <i className='bx bxs-cog'></i>
              <span className="text">Settings</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="logout">
              <i className='bx bxs-log-out-circle'></i>
              <span className="text">Logout</span>
            </Link>
          </li>
        </ul>
      </section>
      {/* SIDEBAR */}
    </>
  );
};

export default NewHallDash;
