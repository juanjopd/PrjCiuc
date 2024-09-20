import React from "react";
import styled from "styled-components";
import { FormRegister } from "../components/FormRegister";
import { TableRegister } from "../components/TableRegister";

export const Registro = () => {
  return (
    <>
      <Container>
        <Titulo>Registro</Titulo>
        <FormRegister />
        <TableRegister />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;

const Titulo = styled.h1`
  text-align: left;
  padding: 20px;
  padding-left: 30px;
`;
