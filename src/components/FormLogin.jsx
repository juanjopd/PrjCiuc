import React from "react";
import "../styles/App.css";
import ucp from "../assets/logoM.png";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export const FormLogin = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="fondo">
      <img className="ucp" src={ucp} alt="Universidad Católica de Pereira" />
      <div className="login-container">
        <div className="login-header"></div>
        <form className="login-form">
          <label htmlFor="email">Usuario</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="coordinaciongds@ucp.edu.co"
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*********"
          />
          <div className="remember-me">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Recordar mis credenciales</label>
          </div>
          <Button
            variant="success"
            type="submit"
            className="login-button"
            onClick={handleClick}
          >
            Ingresar
          </Button>
          <a href="#" className="enlaces">
            Olvidé mi contraseña
          </a>
          <a href="/estudiantes" className="enlaces">
            Registrar estudiante
          </a>
        </form>
      </div>
    </div>
  );
};
