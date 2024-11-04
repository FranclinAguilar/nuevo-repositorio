// src/Sidebar.js
import React from 'react';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Logo</h2>
      </div>
      <ul className="sidebar-menu">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#archivos">Archivos</a></li>
        <li><a href="#usuarios">Usuarios</a></li>
        <li><a href="#carpetas-compartidas">Carpetas Compartidas</a></li>
        <li><a href="#archivos-compartidos">Archivos Compartidos</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
