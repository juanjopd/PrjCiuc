import React from "react";
import styled from "styled-components";
import Charts from "../components/Charts";

export const Dashboard = () => {
  return (
    <Container>
      <Titulo>Dashboard</Titulo>
      <Charts />
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
