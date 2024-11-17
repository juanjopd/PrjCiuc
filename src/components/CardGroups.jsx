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

  const handleNavigate = (tipo) => {
    if (tipo === "examen") {
      navigate("/grupoExamen");
    } else if (tipo === "curso") {
      navigate("/grupoCurso");
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Check the user's role from cookies
        const role = Cookies.get("role"); // Assumes the role is stored in a cookie named "role"
        const userId = Cookies.get("userId"); // Assumes the userId is also stored in cookies

        // Fetch groups based on role
        let response;
        if (role === "admin") {
          // Admin gets all groups
          response = await axios.get(`${baseUrl}/api/groups`);
        } else if (role === "teacher") {
          // Teacher gets only assigned groups
          response = await axios.get(`${baseUrl}/api/groups`, {
            params: { professor_id: userId },
          });
        }

        if (response && response.data.groups) {
          setGroups(response.data.groups);
        } else {
          console.error("No groups found in response:", response);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
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
              onClick={() => handleNavigate(group.tipo)}
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
