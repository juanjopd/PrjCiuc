import styled from "styled-components";
import CreateGroup from "../components/CreateGroup";
import CardGroup from "../components/CardGroups";
import React from "react";

export const Creacion = () => {
  return (
    <div>
      <Container>
        <Titulo>Creacion de grupo</Titulo>
        <CreateGroup />
        <CardGroup />
      </Container>
    </div>
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
