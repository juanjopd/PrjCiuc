import React, { useState } from "react";
import styled from "styled-components";
import { Button, Modal, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FormRegister = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "teacher", // Inicializar directamente como 'teacher'
  });
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si los campos están vacíos
    if (!formData.name || !formData.email || !formData.password) {
      toast.warn("Todos los campos son obligatorios"); // Notificación de advertencia
      return;
    }

    setIsLoading(true);

    try {
      const dataToSend = {
        ...formData,
      };

      const response = await axios.post(`${baseUrl}/api/teacher`, dataToSend);

      // Notificación de éxito
      toast.success("Registro exitoso");

      // Limpiar los campos del formulario
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "teacher",
      });

      handleClose();
    } catch (error) {
      // Si el correo ya está registrado
      if (error.response && error.response.status === 400) {
        toast.error("El correo ya está registrado");
      } else {
        // Otro tipo de error
        toast.error("Error al registrar el profesor");
      }
      console.error("Error al registrar el profesor:", error);
    } finally {
      setIsLoading(false); // Ocultar el indicador de carga
    }
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Registrar profesor
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            {/* Contenedor para el botón */}
            <div className="d-flex justify-content-between">
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  color: white;
  padding: 15px 32px;
  text-align: center;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  position: absolute; /* Position the button absolutely */
  right: 10px; /* Position the button to the right */
  top: 10px; /* Position the button from the top */
`;
