import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const CardGroups = () => {
  return (
    <>
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Ir al grupo</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 15px 32px;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  position: absolute; /* Position the button absolutely */
`;

export default CardGroups;
