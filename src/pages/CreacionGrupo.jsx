import React from "react";
import { TableGroup } from "../components/TableGroup";
import styled from "styled-components";

export const CreacionGrupo = () => {
  return (
    <>
      <Container>
        <TableGroup />
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;
