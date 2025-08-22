import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
// Definições de estilo
const Container = styled.div`
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #f7f9fc;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const TableHeader = styled.thead`
  background-color: #007bff;
  color: #fff;
`;

const Th = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Tbody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const Message = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  background-color: ${(props) => (props.type === "success" ? "#d4edda" : "#f8d7da")};
  color: ${(props) => (props.type === "success" ? "#155724" : "#721c24")};
  border: 1px solid ${(props) => (props.type === "success" ? "#c3e6cb" : "#f5c6cb")};
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  display: block;
  margin: 1rem 0;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default function ExibirListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const fetchClientes = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage({ text: "Erro: Token de autenticação não encontrado.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("https://gestor-docker.onrender.com/logistica/get_clientes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.dados && response.data.dados.length > 0) {
        setClientes(response.data.dados);
        setMessage({ text: `Foram encontrados ${response.data.dados.length} clientes.`, type: "success" });
      } else {
        setClientes([]);
        setMessage({ text: "Nenhum cliente cadastrado.", type: "error" });
      }
    } catch (error) {
      const msg = error.response?.data?.erro || "Erro ao buscar a lista de clientes. Verifique a conexão.";
      setClientes([]);
      setMessage({ text: `Erro: ${msg}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o clique na linha da tabela
  const handleRowClick = (codigo_externo) => {
    // Navega para a nova rota com o código do cliente
    navigate(`/logistica/cliente/${codigo_externo}`);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  return (
    <Container>
      <Title>Lista de Clientes</Title>
      {message.text && <Message type={message.type}>{message.text}</Message>}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
        <Button onClick={fetchClientes} disabled={loading}>
          {loading ? "Carregando..." : "Atualizar Lista"}
        </Button>

        <Link to="/logistica/cadastrar_cliente">
          <Button as="div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Cadastrar Cliente
          </Button>
        </Link>
      </div>
      {loading && <p>Carregando clientes...</p>}
      
      {!loading && clientes.length > 0 && (
        <Table>
          <TableHeader>
            <tr>
              <Th>Código Externo</Th>
              <Th>Nome</Th>
              <Th>Email</Th>
              <Th>Telefone de Cadastro</Th>
            </tr>
          </TableHeader>
          <Tbody>
            {clientes.map((cliente) => (
              // Adiciona o evento de clique na linha da tabela
              <tr key={cliente.codigo_externo} onClick={() => handleRowClick(cliente.codigo_externo)}>
                <Td>{cliente.codigo_externo}</Td>
                <Td>{cliente.nome}</Td>
                <Td>{cliente.email || "N/A"}</Td>
                <Td>{cliente.telefone_cadastro || "N/A"}</Td>
              </tr>
            ))}
          </Tbody>
        </Table>
      )}
      {!loading && clientes.length === 0 && !message.text && (
        <Message type="error">Nenhum cliente cadastrado.</Message>
      )}
    </Container>
  );
}
