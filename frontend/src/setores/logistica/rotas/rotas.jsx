import React, { useState } from 'react';
import { loginUser } from './engine.js';
import { Main } from './styles.js';
import Navbar from '../components/nav_bar.jsx';
import {
  Container,
  Title,
  Input,
  Button,
  ErrorMessage
} from './styles.js';

function Rotas_lg() {

  return (
    <Container>
      <Navbar />
      <Main>Rotas</Main>
    </Container>
  );
}

export default Rotas_lg;
