import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import Form from './Form.js'
import Text from './Text.js'
import Box from '@mui/material/Box';

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <div className='logo'>
        <div className='logo-nav'>
          <h4 style={{ color: '#CC7F06' }}><FaIcons.FaGlobe /> English</h4>
          <h4 style={{ color: '#CC7F06' }}><FaIcons.FaUser /> John Doe</h4>
          <h4 style={{ color: '#CC7F06' }}> Logout</h4>
          <img src="images/logo.svg" alt="logo" />
        </div>
      </div>

      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      <Box sx={{ width: 1 }}>
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
          <Box gridColumn="span 6">
            <Text />
          </Box>
          <Box gridColumn="span 6">
            <Form />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Navbar;