import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

export const TableRegister = () => {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(false); // Estado para indicar si se está cargando los datos
  const [error, setError] = useState(null); // Estado para almacenar errores

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/v1/users");
        const usersData = response.data;
        setUsers(usersData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const columns = [
    {
      name: "Nombre",
    },
    {
      name: "Correo",
    },
    {
      name: "Password",
    },
    {
      name: "Idioma",
    },
  ];

  return (
    <>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <DataTable columns={columns} data={users} />
      )}
      {error && <p>Error: {error.message}</p>}
    </>
  );
};
