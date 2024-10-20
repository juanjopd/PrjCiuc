import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import styled from "styled-components";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Form>
            <Form.Group className="mb-3" controlId="Form.ControlInput1">
              <Form.Label>Nombre del grupo</Form.Label>
              <Form.Control type="text" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo de grupo</Form.Label>
              <Select options={tipo} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Form.ControlInput2">
              <Form.Label>nivel</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Idioma</Form.Label>
              <Select options={idiomas} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profesor</Form.Label>
              <Select options={options} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Guardar</Button>
        </Modal.Footer>
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
