import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './engine';
import {
  Container,
  LoginBox,
  Title,
  Input,
  Button,
  ErrorMessage,
  Esqueci_senha
} from './styles';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      const resposta = await loginUser(email, senha);
      console.log('Login efetuado:', resposta);
      setErro('');
      localStorage.setItem('token', resposta.access_token);
      navigate('/logistica/home');

    } catch (error) {
      setErro('Email ou senha incorretos.');
    }
  };

  return (
    <Container>
      <LoginBox onSubmit={handleSubmit}>
        <Title>Login</Title>
        <Input
          autoComplete='email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
        />
        <Button type="submit">Entrar</Button>
        {erro && <ErrorMessage>{erro}</ErrorMessage>}
        <Esqueci_senha href="/esqueci-senha">Esqueci minha senha</Esqueci_senha>
      </LoginBox>
    </Container>
  );
}

export default Login;
