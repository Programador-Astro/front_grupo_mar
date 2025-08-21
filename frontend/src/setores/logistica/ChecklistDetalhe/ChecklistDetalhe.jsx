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
      .catch(() => {
        setError("Erro ao carregar checklist.");
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Container>
        <p>Carregando...</p>
      </Container>
    );
  if (error)
    return (
      <Container>
        <p>{error}</p>
      </Container>
    );
  if (!checklist)
    return (
      <Container>
        <p>Checklist não encontrado.</p>
      </Container>
    );

  return (
    <Container>
      <Navbar />
      <Title>Checklist #{checklist.id}</Title>

      <Main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          padding: "20px",
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "900px",
          margin: "20px auto",
        }}
      >
        {/* Informações principais */}
        <div style={{ textAlign: "center" }}>
          <p>
            <strong>Data:</strong> {checklist.data}
          </p>
          <p>
            <strong>KM:</strong> {checklist.km}
          </p>
          <p>
            <strong>Temperatura:</strong> {checklist.temperatura}°C
          </p>
          <p>
            <strong>Combustível:</strong> {checklist.combustivel}%
          </p>
        </div>

        {/* Fotos principais */}
        {checklist.fotos && checklist.fotos.length > 0 && (
          <div>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
              Fotos do Checklist
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              {checklist.fotos.map((foto, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <img
                    src={`http://localhost:5000${foto.url}`}
                    alt={foto.nome}
                    style={{
                      width: "150px",
                      height: "auto",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      objectFit: "cover",
                    }}
                  />
                  <p style={{ fontSize: "0.9rem", marginTop: "5px" }}>
                    {foto.nome}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fotos adicionais (extras) */}
        {checklist.fotos_extras && checklist.fotos_extras.length > 0 && (
          <div>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
              Fotos Adicionais
            </h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                justifyContent: "center",
              }}
            >
              {checklist.fotos_extras.map((foto, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                  }}
                >
                  <img 
                    src={`http://localhost:5000${foto.url}`} 
                    alt={`Foto Adicional ${index + 1}`}
                    style={{
                      width: "150px",
                      height: "auto",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      objectFit: "cover",
                    }}
                  />
                  <p style={{ fontSize: "0.9rem", marginTop: "5px" }}>
                    Foto Adicional {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Link to={`/logistica/veiculos`} style={{ textAlign: "center" }}>
          <Button>Voltar para Lista</Button>
        </Link>
      </Main>
    </Container>
  );
}
