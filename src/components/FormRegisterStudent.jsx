import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import axios from "axios";

const options = [
  { value: "primero", label: "1" },
  { value: "segundo", label: "2" },
  { value: "tercero", label: "3" },
  { value: "cuarto", label: "4" },
  { value: "quinto", label: "5" },
  { value: "sexto", label: "6" },
  { value: "septimo", label: "7" },
  { value: "octavo", label: "8" },
  { value: "noveno", label: "9" },
  { value: "decimo", label: "10" },
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
  });

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
    console.log(formData); // Verifica que solo contenga 'role'
    try {
      await axios.post(`${baseUrl}/api/users`, formData); // Cambia la URL según tu API
      alert("Registro exitoso");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  return (
    <div className="fondo">
      <div className="login-container">
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
          {/*  {selectedRole && selectedRole.value === "student" && (
            <>
              <Form.Group className="mb-3" controlId="formSemestre">
                <Form.Label>Semestre</Form.Label>
                <Form.Control
                  type="text"
                  name="semestre"
                  value={formData.semestre}
                  onChange={handle User Input}
                />
              </Form.Group>
            </>
          )} */}
          <Button variant="success" type="submit">
            Registrar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FormRegisterStudent;
