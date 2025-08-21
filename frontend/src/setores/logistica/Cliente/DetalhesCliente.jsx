import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Estilos
const Container = styled.div`
  max-width: 900px;
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

const Section = styled.div`
  margin-bottom: 2rem;
`;

const InfoBox = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const Label = styled.p`
  font-weight: bold;
  color: #555;
  margin: 0.5rem 0 0.2rem;
`;

const Value = styled.p`
  margin: 0;
  color: #333;
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
  margin-top: 1rem;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

export default function DetalhesCliente() {
  const { codigo_cliente } = useParams();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showPedidoForm, setShowPedidoForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    endereco: "",
    numero: "",
    ponto_ref: "",
    obs: "",
  });
  const [pdfPedido, setPdfPedido] = useState(null);
  const navigate = useNavigate();

  const fetchCliente = async () => {
    setLoading(true);
    setMessage({ text: "", type: "" });
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage({ text: "Erro: Token de autenticação não encontrado.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/logistica/get_cliente/${codigo_cliente}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.dados) {
        setCliente(response.data.dados);
        setMessage({ text: "Detalhes do cliente carregados com sucesso.", type: "success" });
      } else {
        setCliente(null);
        setMessage({ text: "Cliente não encontrado.", type: "error" });
      }
    } catch (error) {
      const msg = error.response?.data?.erro || "Erro ao carregar cliente.";
      setCliente(null);
      setMessage({ text: `Erro: ${msg}`, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCliente();
  }, [codigo_cliente]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    const token = localStorage.getItem("token");

    if (!codigo_cliente) {
      setMessage({ text: "Erro: O código do cliente não foi encontrado na URL.", type: "error" });
      return;
    }

    if (!token) {
      setMessage({ text: "Erro: Token de autenticação não encontrado.", type: "error" });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/logistica/cadastrar_endeco_motorista",
        { ...newAddress, codigo_externo: codigo_cliente },
        { 
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          }
        }
      );
      setMessage({ text: "Endereço cadastrado com sucesso!", type: "success" });
      setShowAddressForm(false);
      setNewAddress({
        endereco: "",
        numero: "",
        ponto_ref: "",
        obs: "",
      });
      fetchCliente();
    } catch (error) {
      const msg = error.response?.data?.erro || "Erro ao salvar o endereço.";
      setMessage({ text: `Erro: ${msg}`, type: "error" });
    }
  };

  const handleFileChange = (e) => {
    setPdfPedido(e.target.files[0]);
  };

  const handleSavePedido = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    
    if (!pdfPedido) {
      setMessage({ text: "Por favor, selecione um arquivo PDF.", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("pdf_pedido", pdfPedido);
    formData.append("endereco_adm", "1"); // Valor fixo conforme solicitado

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ text: "Erro: Token de autenticação não encontrado.", type: "error" });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/logistica/cadastrar_pedido",
        formData,
      
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      setMessage({ text: "Pedido cadastrado com sucesso!", type: "success" });
      setShowPedidoForm(false);
      setPdfPedido(null);
    } catch (error) {
      const msg = error.response?.data?.erro || "Erro ao cadastrar o pedido.";
      setMessage({ text: `Erro: ${msg}`, type: "error" });
    }
  };

  return (
    <Container>
      <Title>Detalhes do Cliente</Title>
      {message.text && <Message type={message.type}>{message.text}</Message>}

      {loading && <p>Carregando dados do cliente...</p>}

      {!loading && cliente && (
        <>
          {/* Dados básicos */}
          <Section>
            <h3>Dados do Cliente</h3>
            <InfoBox>
              <Label>Código Externo</Label>
              <Value>{cliente.codigo_externo}</Value>

              <Label>Nome</Label>
              <Value>{cliente.nome}</Value>

              <Label>Email</Label>
              <Value>{cliente.email || "N/A"}</Value>

              <Label>Telefone Cadastro</Label>
              <Value>{cliente.telefone_cadastro || "N/A"}</Value>

              <Label>Telefone Motorista</Label>
              <Value>{cliente.telefone_motorista || "N/A"}</Value>
            </InfoBox>
          </Section>

          {/* Endereços ADM */}
          <Section>
            <h3>Endereços Administrativos</h3>
            {cliente.enderecos_adm?.length > 0 ? (
              cliente.enderecos_adm.map((end) => (
                <InfoBox key={end.id}>
                  <Label>Endereço</Label>
                  <Value>{end.endereco}, {end.numero}</Value>

                  <Label>Ponto Ref</Label>
                  <Value>{end.ponto_ref || "N/A"}</Value>

                  {end.latitude && end.longitude ? (
                    <a
                      href={`https://www.google.com/maps?q=${end.latitude},${end.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#007bff", textDecoration: "underline", marginTop: "4px" }}
                    >
                      📍 Ver no Maps
                    </a>
                  ) : (
                    <Value>Localização não cadastrada</Value>
                  )}
                </InfoBox>
              ))
            ) : (
              <p>Nenhum endereço administrativo cadastrado.</p>
            )}

            {/* Botão para mostrar/esconder o formulário de pedido */}
            {!showPedidoForm && (
              <Button onClick={() => setShowPedidoForm(true)}>Cadastrar Pedido</Button>
            )}

            {/* Formulário para cadastrar pedido */}
            {showPedidoForm && (
              <Form onSubmit={handleSavePedido}>
                <Label>ID do Endereço Administrativo:</Label>
                <Value>1 (valor fixo para teste)</Value>

                <Label>Anexar PDF do Pedido:</Label>
                <Input
                  type="file"
                  name="pdf_pedido"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  required
                />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button type="submit">Salvar Pedido</Button>
                  <Button type="button" onClick={() => setShowPedidoForm(false)}>Cancelar</Button>
                </div>
              </Form>
            )}
          </Section>

          {/* Endereços Motorista */}
          <Section>
            <h3>Endereços Motoristas</h3>
            {cliente.enderecos_motorista?.length > 0 ? (
              cliente.enderecos_motorista.map((end) => (
                <InfoBox key={end.id}>
                  <Label>Endereço</Label>
                  <Value>{end.endereco}, {end.numero}</Value>

                  <Label>Ponto Ref</Label>
                  <Value>{end.ponto_ref || "N/A"}</Value>

                  {end.latitude && end.longitude ? (
                    <a
                      href={`https://www.google.com/maps?q=${end.latitude},${end.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#007bff", textDecoration: "underline", marginTop: "4px" }}
                    >
                      📍 Ver no Maps
                    </a>
                  ) : (
                    <Value>Localização não cadastrada</Value>
                  )}
                </InfoBox>
              ))
            ) : (
              <p>Nenhum endereço de motorista cadastrado.</p>
            )}
            
            {showAddressForm ? (
              <Form onSubmit={handleSaveAddress}>
                <Label>Endereço</Label>
                <Input type="text" name="endereco" value={newAddress.endereco} onChange={handleInputChange} required />
                
                <Label>Número</Label>
                <Input type="text" name="numero" value={newAddress.numero} onChange={handleInputChange} required />

                <Label>Ponto de Referência</Label>
                <Input type="text" name="ponto_ref" value={newAddress.ponto_ref} onChange={handleInputChange} />
                
                <Label>Observações</Label>
                <Input type="text" name="obs" value={newAddress.obs} onChange={handleInputChange} />

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button type="submit">Salvar endereço</Button>
                  <Button type="button" onClick={() => setShowAddressForm(false)}>Cancelar</Button>
                </div>
              </Form>
            ) : (
              <Button onClick={() => setShowAddressForm(true)}>Cadastrar Endereço</Button>
            )}
          </Section>

          {/* Pedidos */}
          <Section>
            <h3>Pedidos</h3>
            {cliente.pedidos?.length > 0 ? (
              cliente.pedidos.map((pedido) => (
                <InfoBox key={pedido.id}>
                  <Label>Código Pedido</Label>
                  <Value>{pedido.cod_externo}</Value>

                  <Label>Status</Label>
                  <Value>{pedido.status}</Value>

                  <Label>Data Criação</Label>
                  <Value>{pedido.data_criacao}</Value>

                  <Label>Produtos</Label>
                  <ul>
                    {pedido.produtos.map((p, i) => (
                      <li key={i}>{p.nome} - {p.quantidade}</li>
                    ))}
                  </ul>
                </InfoBox>
              ))
            ) : (
              <p>Nenhum pedido cadastrado.</p>
            )}
          </Section>
        </>
      )}

      <Button onClick={() => navigate("/logistica/clientes")}>
        Voltar para Lista
      </Button>
    </Container>
  );
}
