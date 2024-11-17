import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const semesterOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

const FormRegisterStudent = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [roleOptions, setRoleOptions] = useState([]); // Estado para las opciones de rol
  const [selectedRole, setSelectedRole] = useState(null); // Estado para el rol seleccionado
  const [programas, setProgramas] = useState([]); // Estado para los programas
  const [formData, setFormData] = useState({
    name: "",
    studentCode: "",
    email: "",
    semestre: "",
    password: "",
    role: "",
    programa: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgramas = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/programa`);
        setProgramas(response.data); // Guarda los programas en el estado
      } catch (error) {
        console.error("Error fetching programas:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          console.error("Request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      }
    };

    fetchProgramas();
  }, [baseUrl]);

  const handleSelectChange = (selectedOption, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption.value,
    }));
  };

  // Obtener roles desde la API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/roles`);
        const filteredRoles = response.data.filter((role) =>
          ["student", "teacherStudent", "adminStudent"].includes(role.value)
        );
        setRoleOptions(filteredRoles); // Asignar los roles filtrados
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    };
    fetchRoles();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (selectedOption) => {
    setSelectedRole(selectedOption);
    setFormData({ ...formData, role: selectedOption.value }); // Actualizar a 'role'
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verificar si todos los campos están completos
    if (
      !formData.name ||
      !formData.studentCode ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }
    try {
      await axios.post(`${baseUrl}/api/users`, formData);
      toast.success("Registro exitoso");
      // Espera un momento antes de redirigir para que se muestre el toast
      setTimeout(() => {
        navigate("/groupsStudent");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Supone que el servidor envía un código 409 si el correo ya está registrado
        toast.error("El correo ya está registrado");
      } else {
        toast.error("Error al registrar. Inténtalo nuevamente.");
      }
    }
  };

  return (
    <div className="fondo">
      <div className="login-container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label>Rol</Form.Label>
            <Select
              options={roleOptions}
              value={selectedRole}
              onChange={handleRoleChange}
              placeholder="Selecciona un rol"
              isClearable // Permite limpiar la selección
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre completo</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Código</Form.Label>
            <Form.Control
              type="number"
              name="studentCode"
              value={formData.studentCode}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCorreo">
            <Form.Label>Correo Institucional</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Mostrar campos adicionales solo si el rol es "estudiante" */}
          {selectedRole && selectedRole.value === "student" && (
            <>
              <Form.Group className="mb-3 " controlId="formSemestre">
                <Form.Label>Semestre</Form.Label>
                <Select
                  options={semesterOptions}
                  value={semesterOptions.find(
                    (option) => option.value === formData.semestre
                  )}
                  onChange={(selectedOption) =>
                    setFormData({
                      ...formData,
                      semestre: selectedOption.value,
                    })
                  }
                  placeholder="Seleccione un semestre"
                  menuPlacement="top"
                />
              </Form.Group>
              <Form.Group className="mb-3 ">
                <Form.Label>Programa</Form.Label>
                <Select
                  options={programas.map((programa) => ({
                    value: programa.id, // Suponiendo que 'id' es el identificador único
                    label: programa.name, // Suponiendo que 'nombre' es el nombre del programa
                  }))}
                  placeholder="Selecciona un programa"
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "programa")
                  }
                  menuPlacement="top"
                />
              </Form.Group>
            </>
          )}
          <Button variant="success" type="submit">
            Registrar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FormRegisterStudent;
