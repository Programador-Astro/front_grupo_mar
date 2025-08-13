import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/nav_bar.jsx";
import { Container, Title, Button, Main } from "./styles.js";

export default function ChecklistDetalhe() {
  const { id } = useParams();
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .get(`http://localhost:5000/logistica/get_img/${id}`, config)
      .then((res) => {
        setChecklist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Erro ao carregar checklist.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Container><p>Carregando...</p></Container>;
  if (error) return <Container><p>{error}</p></Container>;
  if (!checklist) return <Container><p>Checklist não encontrado.</p></Container>;

  return (
    <Container>
      <Navbar />
      <Title>Detalhes do Checklist #{checklist.id}</Title>

      <Main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <p><strong>Data:</strong> {checklist.data}</p>
        <p><strong>KM:</strong> {checklist.km}</p>
        <p><strong>Temperatura:</strong> {checklist.temperatura}°C</p>
        <p><strong>Combustível:</strong> {checklist.combustivel}%</p>

        {checklist.fotos && checklist.fotos.length > 0 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            {checklist.fotos.map((foto, index) => (
              <img
                key={index}
                src={`http://localhost:5000${foto.url}`}
                alt={foto.nome}
                style={{
                  width: "120px",
                  height: "auto",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  objectFit: "cover",
                }}
              />
            ))}
          </div>
        )}

        <Link to={`/logistica/veiculos`}>
          <Button>Voltar para Lista</Button>
        </Link>
      </Main>
    </Container>
  );
}
