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
        Společnost TripMap.shop vznikla jako výsledek dlouhých covid uzávěrek v
        roce 2021.
        <br /> Účelem této webové aplikace je tvorba vizuální prezentace Vašich
        vzpomínek z cest.
        <br /> TripMap je stále ve stavu vývoje a proto lze v budoucnu očekávat
        zlepseni uživatelskeho rozhraní či navýšení uživatelské
        kostomizovatelnosti mapy.
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
