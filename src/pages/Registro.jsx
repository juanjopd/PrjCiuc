import React from "react";
import styled from "styled-components";
import { FormRegister } from "../components/FormRegister";
import { TableRegister } from "../components/TableRegister";

export const Registro = () => {
  return (
    <Container>
      <h1>Registro</h1>
      <FormRegister />
      <TableRegister />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;
