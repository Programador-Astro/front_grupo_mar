import React, { useState, useEffect } from "react";
import { Container, Title, FormGroup, Label, Input, Button, FileInput } from "./styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Checklist() {
  const navigate = useNavigate();
  const [placas, setPlacas] = useState([]);
  const [formData, setFormData] = useState({
    placa: "",
    km: "",
    temperatura: "",
    combustivel: "",
    fotoFrontal: null,
    fotoTraseira: null,
    fotoLateral1: null,
    fotoLateral2: null
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios.get("http://localhost:5000/logistica/veiculos", config)
      .then(res => setPlacas(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const token = localStorage.getItem('token');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));

    const url = `http://localhost:5000/logistica/checklist/${formData.placa}`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    };

    axios.post(url, data, config)
      .then(() => {
        console.log("Checklist enviado com sucesso!");
          navigate("/logistica/veiculos"); // Redireciona para a tela de veículos
      })
      .catch(() => console.error("Erro ao enviar checklist"));
  };

  return (
    <Container>
      <Title>Checklist de Veículos</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Placa</Label>
          <Input as="select" name="placa" value={formData.placa} onChange={handleChange} required>
            <option value="">Selecione</option>
            {placas.map((p, index) => (
              <option key={index} value={p}>{p}</option>
            ))}
          </Input>
        </FormGroup>

        <FormGroup>
          <Label>KM</Label>
          <Input type="number" name="km" value={formData.km} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Temperatura</Label>
          <Input type="number" name="temperatura" value={formData.temperatura} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Nível de Combustível (%)</Label>
          <Input type="number" name="combustivel" value={formData.combustivel} onChange={handleChange} required />
        </FormGroup>

        <FormGroup>
          <Label>Foto Frontal</Label>
          <FileInput
            type="file"
            name="fotoFrontal"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Foto Traseira</Label>
          <FileInput
            type="file"
            name="fotoTraseira"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Foto Lateral 1</Label>
          <FileInput
            type="file"
            name="fotoLateral1"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Foto Lateral 2</Label>
          <FileInput
            type="file"
            name="fotoLateral2"
            accept=".png, .jpg, .jpeg"
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit">Enviar Checklist</Button>
      </form>
    </Container>
  );
}
