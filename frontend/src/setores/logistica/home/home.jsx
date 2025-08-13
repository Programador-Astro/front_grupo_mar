import React, { useState } from 'react';
import { loginUser } from './engine';
import { Main } from './styles';
import Navbar from '../components/nav_bar.jsx';
import {
  Container,
  Title,
  Input,
  Button,
  ErrorMessage
} from './styles';

function Login() {

  return (
    <Container>
      <Navbar />
      <Main>Main</Main>
    </Container>
  );
}

export default Login;
