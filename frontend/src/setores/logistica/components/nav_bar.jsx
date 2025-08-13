import React from 'react';
import { Link } from 'react-router-dom';
import './nav_bar.css'; // Importa o CSS externo

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo" >Grupo <br /> MAR  </h1>

        <ul className="navbar-menu">
          <li><Link to="/logistica/home">Inicio</Link></li>
          <li><Link to="/logistica/rotas">Rotas</Link></li>
          <li><Link to="/logistica/veiculos">Veiculos</Link></li>

          <li><Link to="/logistica/estoque">Estoque</Link></li>
          <li><Link to="/logistica/pedido">Pedidos</Link></li>
          <li><Link to="/logistica/cliente">Clientes</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;