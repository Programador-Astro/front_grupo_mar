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
    obs: "",
    fotoFrontal: null,
    fotoTraseira: null,
    fotoLateral1: null,
    fotoLateral2: null,
  });
  const [previews, setPreviews] = useState({});
  const [fotosAdicionais, setFotosAdicionais] = useState([]);
  const [previewAdicionais, setPreviewAdicionais] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .get("https://gestor-docker.onrender.com/logistica/veiculos", config)
      .then((res) => setPlacas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, files, value } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreviews({ ...previews, [name]: URL.createObjectURL(file) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFotosAdicionais = (e) => {
    const files = Array.from(e.target.files);
    setFotosAdicionais([...fotosAdicionais, ...files]);
    const novosPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewAdicionais([...previewAdicionais, ...novosPreviews]);
  };

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    fotosAdicionais.forEach((foto, index) =>
      data.append(`fotoAdicional_${index + 1}`, foto)
    );

    const url = `https://gestor-docker.onrender.com/logistica/checklist/${formData.placa}`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      }
    };

    axios
      .post(url, data, config)
      .then(() => {
        console.log("Checklist enviado com sucesso!");
        navigate("/logistica/veiculos");
      })
      .catch(() => console.error("Erro ao enviar checklist"));
  };

  return (
    <Container style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <Title style={{ fontSize: "1.5rem", textAlign: "center", marginBottom: "1rem" }}>
        Checklist de Veículos
      </Title>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Seleção da placa */}
        <FormGroup>
          <Label style={{ fontWeight: "600" }}>Placa</Label>
          <Input
            as="select"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            required
            style={{ padding: "0.8rem", borderRadius: "8px", fontSize: "1rem" }}
          >
            <option value="">Selecione</option>
            {placas.map((p, index) => (
              <option key={index} value={p}>
                {p}
              </option>
            ))}
          </Input>
        </FormGroup>

        {/* Campos de texto */}
        {[
          { label: "KM", name: "km", type: "number" },
          { label: "Temperatura", name: "temperatura", type: "number" },
          { label: "Nível de Combustível (%)", name: "combustivel", type: "number" },
        ].map((field, idx) => (
          <FormGroup key={idx}>
            <Label style={{ fontWeight: "600" }}>{field.label}</Label>
            <Input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
              style={{ padding: "0.8rem", borderRadius: "8px", fontSize: "1rem" }}
            />
          </FormGroup>
        ))}

        {/* Observações */}
        <FormGroup>
          <Label style={{ fontWeight: "600" }}>Observações</Label>
          <textarea
            name="obs"
            value={formData.obs}
            onChange={handleChange}
            placeholder="Escreva observações adicionais aqui..."
            rows="4"
            style={{
              width: "100%",
              padding: "0.8rem",
              borderRadius: "8px",
              fontSize: "1rem",
              resize: "none",
            }}
          />
        </FormGroup>

        {/* Fotos padrão */}
        {["fotoFrontal", "fotoTraseira", "fotoLateral1", "fotoLateral2"].map(
          (field, idx) => (
            <FormGroup key={idx} style={{ textAlign: "center" }}>
              <Label style={{ fontWeight: "600" }}>
                {field.replace("foto", "Foto ")}
              </Label>
              <FileInput
                type="file"
                name={field}
                accept="image/*"
                capture="camera"
                onChange={handleChange}
                required
                style={{ marginTop: "0.5rem" }}
              />
              {previews[field] && (
                <img
                  src={previews[field]}
                  alt={field}
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    marginTop: "0.5rem",
                    borderRadius: "10px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                />
              )}
            </FormGroup>
          )
        )}

        {/* Fotos adicionais */}
        <FormGroup style={{ textAlign: "center" }}>
          <Label style={{ fontWeight: "600" }}>Fotos Adicionais</Label>
          <FileInput
            type="file"
            multiple
            accept="image/*"
            capture="camera"
            onChange={handleFotosAdicionais}
            style={{ marginTop: "0.5rem" }}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "10px",
              justifyContent: "center",
            }}
          >
            {previewAdicionais.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`fotoAdicional_${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              />
            ))}
          </div>
        </FormGroup>

        <Button
          type="submit"
          style={{
            padding: "1rem",
            fontSize: "1.1rem",
            borderRadius: "10px",
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
          }}
        >
          Enviar Checklist
        </Button>
      </form>
    </Container>
  );
}
