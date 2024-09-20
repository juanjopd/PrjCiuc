import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import styled from "styled-components";

export const TableRegister = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando los datos
  const [error, setError] = useState(null); // Estado para almacenar errores

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/v1/users");
      if (response.status >= 200 && response.status < 300) {
        const usersData = response.data.body;
        setUsers(usersData);
      } else {
        setError("Error en la respuesta de la API");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "correo",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.role,
    },
    {
      name: "idioma",
      selector: (row) => row.language,
      sortable: true,
    },
  ];

  return (
    <>
      <Container>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable
            title="Usuarios"
            columns={columns}
            data={users}
            pagination
            highlightOnHover
            striped
            responsive
            dense
            noHeader
          />
        )}
        {error && <p>Error: {error}</p>}
      </Container>
    </>
  );
};
const Container = styled.div`
  background-color: #ffffff; /* Fondo blanco */
  border-radius: 10px; /* Bordes redondeados */
  padding: 20px; /* Paddings de 20px */
  margin-top: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 95%;
  margin-left: 40px;
`;
