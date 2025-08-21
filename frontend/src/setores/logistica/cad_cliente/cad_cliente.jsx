import React, { useState } from "react";
import axios from "axios";
import { Container, Title, FormGroup, Label, Input, Button, FileInput, Message } from "./styles";

export default function CadastroCliente() {
  const [pdfFile, setPdfFile] = useState(null);
  const [jsonData, setJsonData] = useState({
    codigo_externo: "",
    nome: "",
    email: "",
    tell_cadastro: "",
    tell_motorista: "",
    endereco_nota: "",
    numero: "",
    ponto_ref: "",
    obs: "",
    endereco_motorista: "",
    numero_motorista: "",
    ponto_ref_motorista: "",
    obs_motorista: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleJsonChange = (e) => {
    const { name, value } = e.target;
    setJsonData({
      ...jsonData,
      [name]: value
    });
  };

  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage({ text: "Erro: Token de autenticação não encontrado.", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("pdf_pedido", pdfFile);

    try {
      const response = await axios.post("http://localhost:5000/logistica/cadastrar_cliente", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      setMessage({ text: "PDF enviado com sucesso!", type: "success" });
    } catch (error) {
      const msg = error.response?.data?.msg || "Erro ao enviar o PDF. Verifique a conexão.";
      setMessage({ text: `Erro: ${msg}`, type: "error" });
    }
  };

  const handleJsonSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ text: "Erro: Token de autenticação não encontrado.", type: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/logistica/cadastrar_cliente", jsonData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setMessage({ text: "Cliente cadastrado com sucesso por JSON!", type: "success" });
    } catch (error) {
      const msg = error.response?.data?.msg || "Erro ao cadastrar cliente por JSON. Verifique a conexão.";
      setMessage({ text: `Erro: ${msg}`, type: "error" });
    }
  };

  return (
    <Container>
      <Title>Cadastro de Cliente</Title>
      {message.text && <Message type={message.type}>{message.text}</Message>}

      {/* Formulário para upload de PDF */}
      <h3>Cadastro via PDF</h3>
      <form onSubmit={handlePdfSubmit}>
        <FormGroup>
          <Label>Anexar Pedido (PDF)</Label>
          <FileInput type="file" onChange={handlePdfChange} accept=".pdf" required />
        </FormGroup>
        <Button type="submit">Enviar PDF</Button>
      </form>

      <hr style={{ margin: "2rem 0", borderColor: "#ccc" }} />

      {/* Formulário para cadastro via JSON */}
      <h3>Cadastro Manual (PRENCHA TODOS COM "*")</h3>
      <form onSubmit={handleJsonSubmit}>
        {/* Dados do Cliente */}
        <h4>Dados do Cliente</h4>
        <FormGroup>
          <Label>Código Externo*</Label>
          <Input type="text" name="codigo_externo" value={jsonData.codigo_externo} onChange={handleJsonChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Nome do Cliente*</Label>
          <Input type="text" name="nome" value={jsonData.nome} onChange={handleJsonChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input type="email" name="email" value={jsonData.email} onChange={handleJsonChange} />
        </FormGroup>

        <FormGroup>
          <Label>Telefone (Que está na nota)*</Label>
          <Input type="text" name="tell_cadastro" value={jsonData.tell_cadastro} onChange={handleJsonChange} />
        </FormGroup>

        <FormGroup>
          <Label>Telefone (Informado pelo motorista)</Label>
          <Input type="text" name="tell_motorista" value={jsonData.tell_motorista} onChange={handleJsonChange} />
        </FormGroup>
        
        <hr style={{ margin: "1rem 0", borderColor: "#eee" }} />

        {/* Dados do Endereço da Nota */}
        <h4>Dados do Endereço da Nota</h4>
        <FormGroup>
          <Label>Endereço de Nota*</Label>
          <Input type="text" name="endereco_nota" value={jsonData.endereco_nota} onChange={handleJsonChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Número </Label>
          <Input type="text" name="numero" value={jsonData.numero} onChange={handleJsonChange} />
        </FormGroup>

        <FormGroup>
          <Label>Ponto de Referência</Label>
          <Input type="text" name="ponto_ref" value={jsonData.ponto_ref} onChange={handleJsonChange} />
        </FormGroup>

        <FormGroup>
          <Label>Observações</Label>
          <Input type="text" name="obs" value={jsonData.obs} onChange={handleJsonChange} />
        </FormGroup>
        
        <hr style={{ margin: "1rem 0", borderColor: "#eee" }} />

        {/* Dados do Endereço do Motorista */}
        <h4>Dados do Endereço Informado pelo Motorista</h4>
        <FormGroup>
          <Label>Endereço do Motorista</Label>
          <Input type="text" name="endereco_motorista" value={jsonData.endereco_motorista} onChange={handleJsonChange} />
        </FormGroup>

        <FormGroup>
          <Label>Número</Label>
          <Input type="text" name="numero_motorista" value={jsonData.numero_motorista} onChange={handleJsonChange} />
        </FormGroup>

        <FormGroup>
          <Label>Ponto de Referência</Label>
          <Input type="text" name="ponto_ref_motorista" value={jsonData.ponto_ref_motorista} onChange={handleJsonChange} />
        </FormGroup>

        <FormGroup>
          <Label>Observações</Label>
          <Input type="text" name="obs_motorista" value={jsonData.obs_motorista} onChange={handleJsonChange} />
        </FormGroup>

        <Button type="submit">Cadastrar Cliente</Button>
      </form>
    </Container>
  );
}
