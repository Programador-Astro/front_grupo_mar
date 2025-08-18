  import React, { useState, useEffect } from "react";
  import { useParams, Link } from "react-router-dom";
  import axios from "axios";
  import Navbar from "../components/nav_bar.jsx";
  import { Container, Title, Button, Main } from "./styles.js";

  export default function VeiculoChecklists() {
    const { placa } = useParams();
    const [checklists, setChecklists] = useState([]);

    useEffect(() => {
          // Pega o token do localStorage
        const token = localStorage.getItem('token');
      
        // Adiciona o token ao cabeçalho da requisição
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        axios
        .get(`https://gestor-docker.onrender.com/logistica/checklist/${placa}`,config)
        .then((res) => {
          const sorted = res.data.sort(
            (a, b) => new Date(b.data) - new Date(a.data)
          );
          setChecklists(sorted);
        })
        .catch((err) => console.error("Erro ao carregar checklists:", err));
    }, [placa]);

    return (
      <Container>
        <Navbar />
        <Title>Checklists do veículo {placa}</Title>

        <Main
          style={{
            display: "flex",
            flexWrap: "wrap", // permite itens quebrarem linha
            gap: "15px",
            justifyContent: "center", // centraliza na horizontal
          }}
        >
          {checklists.length > 0 ? (
            checklists.map((c) => (
              <div
                key={c.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  borderRadius: "8px",
                  background: "#f9f9f9",
                  flex: "1 1 300px", // mínimo 300px, cresce conforme espaço
                  maxWidth: "350px",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={{ margin: "5px 0" }}>
                  <strong>Autor:</strong> {c.autor}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Data:</strong> {c.data}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>KM:</strong> {c.km}
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Temperatura:</strong> {c.temperatura}°C
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>Combustível:</strong> {c.combustivel}%
                </p>

                {c.fotos && c.fotos.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "10px",
                      justifyContent: "center",
                    }}
                  >
                    {c.fotos.map((foto, index) => (
                      
                      <img
                        key={index}
                        src={`https://gestor-docker.onrender.com${foto.url}`}
                        alt={foto.nome}
                        style={{
                          width: "100px",
                          height: "auto",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                )}

              <Link to={`/logistica/checklist_detalhe/${c.id}`}>
                <Button style={{ marginTop: "10px", alignSelf: "center" }}>
                  Ver Detalhes
                </Button>
              </Link>
              </div>
            ))
          ) : (
            <p>Nenhum checklist encontrado para este veículo.</p>
          )}
        </Main>

        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/logistica/veiculos">
            <Button>Voltar</Button>
          </Link>
        </div>
      </Container>
    );
  }
