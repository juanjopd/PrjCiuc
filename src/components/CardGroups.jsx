import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardGroups = () => {
  const [groups, setGroups] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const handleNavigate = (tipo, id) => {
    if (tipo === "examen") {
      navigate(`/grupoExamen/${id}`);
    } else if (tipo === "curso") {
      navigate(`/grupoCurso/${id}`);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Verificar el rol y el usuario actual desde las cookies
        const role = Cookies.get("role"); // Rol del usuario
        const userId = Cookies.get("userId"); // ID del usuario (asociado al profesor)

        let response;

        if (role === "admin") {
          // Si el usuario es administrador, obtiene todos los grupos
          response = await axios.get(`${baseUrl}/api/groups`);
        } else if (role === "teacher") {
          // Si el usuario es profesor, obtiene grupos asignados
          response = await axios.get(`${baseUrl}/api/groups/professors/${userId}`);
        }

        // Verifica y establece los datos en el estado
        if (response && response.data.groups) {
          setGroups(response.data.groups);
        } else {
          console.error("No se encontraron grupos en la respuesta:", response);
        }
      } catch (error) {
        console.error("Error al obtener los grupos:", error);
      }
    };

    fetchGroups();
  }, [baseUrl]);

  return (
    <Container>
      {groups.map((group) => (
        <Card key={group.id} style={{ width: "18rem", marginBottom: "1rem" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              {group.name}
            </Card.Title>
            <Card.Text>
              <strong>Tipo:</strong> {group.tipo} <br />
              <strong>Nivel:</strong> {group.nivel} <br />
              <strong>Idioma:</strong> {group.idioma} <br />
              <strong>Profesor:</strong> {group.profesor?.name || "N/A"}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => handleNavigate(group.tipo, group.id)}
            >
              Ir al grupo
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 15px 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem; /* Position the button absolutely */
`;

export default CardGroups;
