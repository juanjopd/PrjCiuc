import React from "react";
import "../styles/Register.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
              <Form.Select aria-label="Default select example">
                <option>Selecciona su semestre</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSemestre">
              <Form.Label>Programa</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Selecciona su programa</option>
                <option value="1">1</option>
              </Form.Select>
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
