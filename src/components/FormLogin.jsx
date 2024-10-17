import {React, useState} from "react";
import "../styles/App.css";
import ucp from "../assets/logoM.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "react-bootstrap";

export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseUrl =  import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  /* const handleClick = () => {
    navigate("/dashboard");
  }; */
  
  const handleLogin = async () => {
    event.preventDefault();
    /* post method  http://localhost:3001/auth/login */
      try {
        const response = await axios.post(`${baseUrl}/auth/login`, {
          email: email,
          password: password,
        });
        /* save on cookie for 24 hours */
        document.cookie = `token=${response.data.user.token}; max-age=86400`;
        document.cookie = `user=${response.data.user.email}; max-age=86400`;
        document.cookie = `name=${response.data.user.name}; max-age=86400`;
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
};


  return (
    <div className="fondo">
      <img className="ucp" src={ucp} alt="Universidad Católica de Pereira" />
      <div className="login-container">
        <div className="login-header">Iniciar sesión</div>
        <form className="login-form">
          <label htmlFor="email">Usuario</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="coordinaciongds@ucp.edu.co"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="remember-me">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Recordar mis credenciales</label>
          </div>
          <Button
            variant="success"
            type="submit"
            className="login-button"
            onClick={handleLogin}
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
