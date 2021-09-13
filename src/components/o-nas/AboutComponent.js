/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx } from "theme-ui";

import styled from "styled-components";

import { color } from "utils";

export default function AboutComponent({ name }) {
  return (
    <Container>
      <div>
        <h1>{name}</h1>
        Posláním TripMap.shop je tvorba obrazů či plakátů pro zvěčnění Vašich
        vzpomínek z cest.
        <br />
        Společnost je nástroj na tvorbu krásné nástěnné vizualizace Vaší cesty
        ať už jste se vydali kamkoli.
        <br /> TripMap je stále ve stavu vývoje a proto lze v budoucnu očekávat
        zlepseni uživatelskeho rozhraní či navýšení uživatelské
        kustomizovatelnosti mapy.
      </div>
    </Container>
  );
}

const Container = styled.p`
  width: 100%;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;
