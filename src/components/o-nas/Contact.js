/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx } from "theme-ui";

import styled from "styled-components";

import { color } from "utils";
import { OFFICIAL_EMAIL } from "@constants";

export default function Contact({ name }) {
  return (
    <Container>
      <div>
        <h1>{name}</h1>
        <ul>
          <li>
            adresa: <b>Riegrova 237, 53862 Hrochův Týnec</b>
          </li>
          <li>
            e-mail: <b>{OFFICIAL_EMAIL}</b>
          </li>
          <li>
            telefon: <b>+420 704 206 828</b>
          </li>
          <li>
            IČO: <b>07271387</b>
          </li>
        </ul>
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
