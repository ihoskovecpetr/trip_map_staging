/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx } from "theme-ui";

import styled from "styled-components";
import { color } from "utils";
// import odstoupeni_od_smlouvy from "assets/docs/Odstoupeni_od_smlouvy.pdf";

export default function Objection({ name }) {
  return (
    <Container>
      <div class="tab-pane pt-4 active" id="process">
        <h1>{name}</h1>
        <ol type="I">
          <li>
            <h2>Reklamace</h2>
            <p></p>
            <ol>
              <li>
                DPD, Zásilkovna:
                <ul>
                  <li>
                    Při obdržení zásilky je vždy nejprve nutné ihned balík
                    rozbalit a zkontrolovat jeho obsah (přepravci nemají
                    povinnost čekat na rozbalení balíku).
                  </li>
                </ul>
              </li>
              <li>
                Co dělat, když přijde zásilka poškozená?
                <ul>
                  <li>
                    Jestliže zákazník, po obdržení a rozbalení svého balíku
                    zjistí,že zboží je rozbité, či jinak poškozené, je nutné
                    ihned nahlásit škodu příslušné přepravní službě,
                    prostřednictvím které byla zásilka zákazníkovi doručena.
                  </li>
                </ul>
              </li>
              <li>
                Zboží nesouhlasí s fakturou? Obdrželi jste zboží, které jste si
                neobjednali, nebo něco v balíku chybí?
                <ul>
                  <li>
                    Kontaktujte nás na ihoskovecpetr@gmail.com, kde uveďte číslo
                    objednávky spolu s popisem závady. Co nejdříve Vás budeme
                    kontaktovat s informacemi o dalším postupu.
                  </li>
                </ul>
              </li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Odstoupení od smlouvy do 14 dní</h2>
            <p></p>
            <ol>
              Postup:
              <li>
                Vytiskněte a vyplňte{" "}
                <a
                  href="/Odstoupeni_od_smlouvy.pdf"
                  target="_blank"
                  download="odstoupení od smlouvy.pdf"
                >
                  FORMULÁŘ
                </a>{" "}
                na vrácení zboží.
              </li>
              <li>
                Vyplněný formulář spolu s kopií faktury přiložte k vrácenému
                zboží.
              </li>
              <li>
                Zboží odešlete na adresu:
                <ul>
                  <li>Ing. Petr Hoskovec, Riegrova 237, 53862 Hrochův Týnec</li>
                  <br />
                </ul>
              </li>
            </ol>
            <ul>
              Důležité informace:
              <li>Lhůta pro vrácení je 14 dní od převzetí zboží.</li>
              <li>Vrácené zboží nesmí jevit známky opotřebení.</li>
              <li>
                Vrácené zboží musí být v originálním obalu a se všemi etiketami.
              </li>
              <li>
                Vrácené zboží neposílejte na dobírku, taková zásilka nebude
                převzata.
              </li>
            </ul>
            <br />
            V případě jakýchkoliv dotazů nás prosím kontaktujte e-mailem na
            adrese ihoskovecpetr@gmail.com
            <br />
            Dokumenty ke stažení:
            <br />
            <a
              href="/Odstoupeni_od_smlouvy.pdf"
              target="_blank"
              download="odstoupení od smlouvy.pdf"
            >
              <div type="button" class="btn mt-3" id="contract-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-earmark-arrow-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm-1 4v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 11.293V7.5a.5.5 0 0 1 1 0z"></path>
                </svg>
                &nbsp; PDF - Odstoupení od smlouvy
              </div>
            </a>
            <p></p>
          </li>
        </ol>
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
