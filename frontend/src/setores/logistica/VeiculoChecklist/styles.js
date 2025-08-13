import styled from 'styled-components';
import { keyframes } from 'styled-components';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  background-color: #0f172a; 
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;


export const Title = styled.h2`
  color: #e2e8f0; /* cinza claro */
  margin-bottom: 24px;
  text-align: center;
`;

export const Input = styled.input`
  background-color: #1e293b;
  color: #e2e8f0;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 14px;
  margin-bottom: 20px;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 0 #3b82f6;

  &::placeholder {
    color: #94a3b8;
    transition: color 0.2s ease;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    background-color: #334155;
  }
`;


export const Button = styled.button`
  background-color: #3b82f6; /* azul principal */
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb; /* azul mais escuro no hover */
  }
`;

export const ErrorMessage = styled.p`
  color: #f87171;
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
`;

export const Main = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${fadeInUp} 0.5s ease-in-out;
`;