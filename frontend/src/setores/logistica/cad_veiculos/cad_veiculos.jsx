import React, { useState } from "react";
import { Container, Title, FormGroup, Label, Input, Button } from "./styles";
import axios from "axios";

export default function CadastroVeiculo() {
  const [formData, setFormData] = useState({
    placa: "",
    modelo: "",
    ano: "",
    capacidade: "",
    km_atual: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pega o token do localStorage
      const token = localStorage.getItem('token');
    
      // Adiciona o token ao cabeçalho da requisição
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    axios.post("http://localhost:5000/logistica/veiculos", formData, config)
      .then(() => alert("Veículo cadastrado com sucesso!"))
      .catch(() => alert("Erro ao cadastrar veículo"));
  };

  return (
    <Container>
      <Title>Cadastro de Veículo</Title>
      <form onSubmit={handleSubmit}>
        
        <FormGroup>
          <Label>Placa</Label>
          <Input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Modelo</Label>
          <Input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Ano</Label>
          <Input
            type="number"
            name="ano"
            value={formData.ano}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Km</Label>
          <Input
            type="number"
            name="km_atual"
            value={formData.km_atual}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Capacidade</Label>
          <Input
            type="number"
            name="capacidade"
            value={formData.capacidade}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit">Cadastrar Veículo</Button>
      </form>
    </Container>
  );
}
