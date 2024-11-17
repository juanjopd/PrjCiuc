import styled from "styled-components";
import CreateGroup from "../components/CreateGroup";
import CardGroup from "../components/CardGroups";
import React from "react";

export const Creacion = () => {
  return (
    <>
      <Container>
        <Titulo>Creación de grupo</Titulo>
        <CreateGroup />
        <CardGroup />
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
