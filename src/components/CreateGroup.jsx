import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import styled from "styled-components";

const idiomas = [
  { value: "ingles", label: "Ingles" },
  { value: "italiano", label: "Italiano" },
  { value: "portugues", label: "Portugués" },
];

const tipo = [
  { value: "curso", label: "Curso" },
  { value: "examen", label: "Examen" },
];

const CreateGroup = () => {
  const [show, setShow] = useState(false);
  const [professors, setProfessors] = useState([]); // State for professors
  const [formData, setFormData] = useState({
    name: "",
    tipo: "",
    nivel: "",
    idioma: "",
    /* profesor: "", */
  });

  const baseUrl = import.meta.env.VITE_BASE_URL; // Your API base URL

  // Fetch all professors when the component mounts
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/professors`);
        setProfessors(response.data);
      } catch (error) {
        console.error("Error fetching professors:", error.message); // Agrega error.message
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

    fetchProfessors();
  }, [baseUrl]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOption.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/api/groups`, // URL de la API
        formData
      );
      console.log("Group created successfully:", response.data);
      handleClose(); // Cerrar el modal después de la creación exitosa
    } catch (error) {
      // Imprimir detalles del error
      if (error.response) {
        console.error("Error creating group:", error.response.data.errors); // Cambia aquí para acceder a 'errors'
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <Container>
      <Button variant="primary" onClick={handleShow}>
        Crear grupo
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Creación de grupo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Nombre del grupo</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de grupo</Form.Label>
              <Select
                options={tipo}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "tipo")
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupNivel">
              <Form.Label>Nivel</Form.Label>
              <Form.Control
                type="text"
                name="nivel"
                value={formData.nivel}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Idioma</Form.Label>
              <Select
                options={idiomas}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "idioma")
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profesor</Form.Label>
              <Select
                options={professors.map((professor) => ({
                  value: professor.id, // Usar el ID aquí
                  label: professor.name,
                }))}
                onChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "profesor")
                }
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
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

export default CreateGroup;
