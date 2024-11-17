import React from "react";
import { TableExamen } from "../components/TableExamen";
import styled from "styled-components";

export const Examen = () => {
  return (
    <>
      <Container>
        <TableExamen />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;
