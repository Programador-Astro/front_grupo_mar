import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/nav_bar.jsx';
import {
  Container,
  Title,
  Button,
  Main
} from './styles.js';

function Veiculos() {
  const [veiculos, setVeiculos] = useState([]);

useEffect(() => {
    // Pega o token do localStorage
    const token = localStorage.getItem('token');

    // Adiciona o token ao cabeçalho da requisição
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.get("https://gestor-docker.onrender.com/logistica/veiculos", config)
      .then(res => {
        setVeiculos(res.data);
      })
      .catch(err => console.error("Erro ao carregar veículos:", err));
      }, []);

  return (
    <Container>
      <Navbar />
      <Title>Lista de Veículos</Title>
      <Main style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {veiculos.length > 0 ? (
          veiculos.map((placa, index) => (
            <Link
              key={index}
              to={`/logistica/veiculo/${placa}`} // Vai abrir a página desse veículo
              style={{ textDecoration: 'none' }}
            >
              <Button>{placa}</Button>
            </Link>
          ))
        ) : (
          <p>Carregando veículos...</p>
        )}
      </Main>

      {/* Botões extras fixos */}
      <Main style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <Link to="/logistica/checklist">
          <Button>Checklist</Button>
        </Link>
        <Link to="/logistica/novo_veiculo">
          <Button>Cadastrar Veículo</Button>
        </Link>
      </Main>
    </Container>
  );
}

export default Veiculos;
