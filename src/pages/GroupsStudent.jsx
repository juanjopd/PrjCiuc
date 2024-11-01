import React from "react";
import styled from "styled-components";
import CardGroups from "../components/CardGroups";

export const GroupsStudent = () => {
  return (
    <>
      <Container>
        <Titulo>Mis grupos</Titulo>
        <CardGroups />
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
