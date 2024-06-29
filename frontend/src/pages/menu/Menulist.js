import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './Menu';

const MenuList = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/menus')
      .then(response => {
        setMenus(response.data);
      })
      .catch(error => {
        console.error('Error fetching menus: ', error);
      });
  }, []);

  return (
    <div class="navbar-nav mr-auto py-0">
      
      {menus.map(menu => (
        <Menu key={menu.id} menu={menu} />
      ))}
    </div>
    
    
  );
};

export default MenuList;
