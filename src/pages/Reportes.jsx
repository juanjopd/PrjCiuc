import React from "react";
import CreateReport from "../components/CreateReport";
import styled from "styled-components";

export const Reportes = () => {
  return (
    <Container>
      <Titulo>Reportes</Titulo>
      <CreateReport />
    </Container>
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
