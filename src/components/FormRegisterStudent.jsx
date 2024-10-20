import React from "react";
import "../styles/Register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";

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

const programas = [
  { value: "ae", label: "Administracion de empresas" },
  { value: "primero", label: "1" },
];

const FormRegisterStudent = () => {
  return (
    <>
      <div className="fondo">
        <div className="login-container">
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Codigo</Form.Label>
              <Form.Control type="number" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSemestre">
              <Form.Label>Correo Institucional</Form.Label>
              <Form.Control type="email" placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSemestre">
              <Form.Label>Semestre</Form.Label>
              <Select options={options} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSemestre">
              <Form.Label>Programa</Form.Label>
              <Select options={programas} />
            </Form.Group>
            <Button variant="success" type="submit">
              Registrar
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default FormRegisterStudent;
