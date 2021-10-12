/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx } from "theme-ui";

import styled from "styled-components";

import { color } from "utils";
import { OFFICIAL_EMAIL } from "@constants";

export default function GDPR({ name }) {
  return (
    <Container>
      <div>
        <h1>{name}</h1>
        <ol type="I">
          <li>
            <h2>Základní ustanovení</h2>
            <p></p>
            <ol>
              <li>
                Správcem osobních údajů podle čl. 4 bod 7 nařízení Evropského
                parlamentu a Rady (EU) 2016/679 o ochraně fyzických osob v
                souvislosti se zpracováním osobních údajů a o volném pohybu
                těchto údajů (dále jen: „<strong>GDPR</strong>”) je Ing. Petr
                Hoskovec
              </li>
              <li>
                IČO 07271387 se sídlem Riegrova 237, 53862 Hrochův Týnec. (dále
                jen: „<strong>správce</strong>“).
              </li>
              <li>
                Kontaktní údaje správce jsou:
                <ul>
                  <li>adresa: Riegrova 237, 53862 Hrochův Týnec</li>
                  <li>e-mail: {OFFICIAL_EMAIL}</li>
                  <li>telefon: +420 704 206 828</li>
                </ul>
              </li>
              <li>
                Osobními údaji se rozumí veškeré informace o identifikované nebo
                identifikovatelné fyzické osobě; identifikovatelnou fyzickou
                osobou je fyzická osoba, kterou lze přímo či nepřímo
                identifikovat, zejména odkazem na určitý identifikátor,
                například jméno, identifikační číslo, lokační údaje, síťový
                identifikátor nebo na jeden či více zvláštních prvků fyzické,
                fyziologické, genetické, psychické, ekonomické, kulturní nebo
                společenské identity této fyzické osoby.
              </li>
              <li>Správce nejmenoval pověřence pro ochranu osobních údajů.</li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Zdroje a kategorie zpracovávaných osobních údajů</h2>
            <p></p>
            <ol>
              <li>
                Správce zpracovává osobní údaje, které jste mu poskytl/a nebo
                osobní údaje, které správce získal na základě plnění Vaší
                objednávky:
                <ul>
                  <li>jméno a příjmení</li>
                  <li>e-mailová adresa</li>
                  <li>poštovní adresa</li>
                  <li>telefon</li>
                </ul>
              </li>
              <li>
                Správce zpracovává Vaše identifikační a kontaktní údaje a údaje
                nezbytné pro plnění smlouvy.
              </li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Zákonný důvod a účel zpracování osobních údajů</h2>
            <p></p>
            <ol>
              <li>
                Zákonným důvodem zpracování osobních údajů je:
                <ul>
                  <li>
                    plnění smlouvy mezi Vámi a správcem podle čl. 6 odst. 1
                    písm. b) GDPR,
                  </li>
                  <li>
                    splnění právní povinnosti správce podle čl. 6 odst. 1 písm.
                    c) GDPR,
                  </li>
                  <li>
                    oprávněný zájem správce na poskytování přímého marketingu
                    (zejména pro zasílání obchodních sdělení a newsletterů)
                    podle čl. 6 odst. 1 písm. f) GDPR,
                  </li>
                </ul>
              </li>
              <li>
                Účelem zpracování osobních údajů je:
                <ul>
                  <li>
                    vyřízení Vaší objednávky a výkon práv a povinností
                    vyplývajících ze smluvního vztahu mezi Vámi a správcem; při
                    objednávce jsou vyžadovány osobní údaje, které jsou nutné
                    pro úspěšné vyřízení objednávky (jméno a adresa, kontakt),
                    poskytnutí osobních údajů je nutným požadavkem pro uzavření
                    a plnění smlouvy, bez poskytnutí osobních údajů není možné
                    smlouvu uzavřít či jí ze strany správce plnit,
                  </li>
                  <li>plnění právních povinností vůči státu,</li>
                  <li>
                    zasílání obchodních sdělení a činění dalších marketingových
                    aktivit.
                  </li>
                </ul>
              </li>
              <li>
                Ze strany správce nedochází automatickému individuálnímu
                rozhodování ve smyslu čl. 22 GDPR. S takovým zpracováním jste
                poskytl/a svůj výslovný souhlas.
              </li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Doba uchovávání údajů</h2>
            <p></p>
            <ol>
              <li>
                Správce uchovává osobní údaje:
                <ul>
                  <li>
                    po dobu nezbytnou k výkonu práv a povinností vyplývajících
                    ze smluvního vztahu mezi Vámi a správcem a uplatňování
                    nároků z těchto smluvních vztahů (po dobu 15 let od ukončení
                    smluvního vztahu).
                  </li>
                </ul>
              </li>
              <li>
                Po uplynutí doby uchovávání osobních údajů správce osobní údaje
                vymaže.
              </li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Příjemci osobních údajů (subdodavatelé správce)</h2>
            <p></p>
            <ol>
              <li>
                Příjemci osobních údajů jsou osoby:
                <ul>
                  <li>
                    podílející se na dodání zboží/služeb/realizaci plateb na
                    základě smlouvy,
                  </li>
                  <li>
                    zajišťující služby provozování e-shopu a další služby v
                    souvislosti s provozováním e-shopu,
                  </li>
                  <li>zajišťující marketingové služby.</li>
                  <li>účetní a daňoví poradci</li>
                  <li>advokát</li>
                </ul>
              </li>
              <li>
                Správce má v úmyslu předat osobní údaje do třetí země (do země
                mimo EU) nebo mezinárodní organizaci. Příjemci osobních údajů ve
                třetích zemích jsou poskytovatelé mailingových služeb.
              </li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Zpracovatelé osobních údajů</h2>
            <p></p>
            <ol>
              <li>
                Zpracování osobních údajů je prováděno správcem, osobní údaje
                však pro něj mohou zpracovávat i tito zpracovatelé:
                <ul>
                  <li>poskytovatel služby Mailchimp,</li>
                  <li>
                    případně další poskytovatel zpracovatelských softwarům
                    služeb a aplikací, které však v současné době správce
                    nevyužívá.
                  </li>
                </ul>
              </li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Vaše práva</h2>
            <p></p>
            <ol>
              <li>
                Za podmínek stanovených v GDPR máte:
                <ul>
                  <li>
                    právo na přístup ke svým osobním údajům dle čl. 15 GDPR,
                  </li>
                  <li>
                    právo opravu osobních údajů dle čl. 16 GDPR, popřípadě
                    omezení zpracování dle čl. 18 GDPR,
                  </li>
                  <li>právo na výmaz osobních údajů dle čl. 17 GDPR,</li>
                  <li>
                    právo vznést námitku proti zpracování dle čl. 21 GDPR,
                  </li>
                  <li>právo na přenositelnost údajů dle čl. 20 GDPR a</li>
                  <li>
                    právo odvolat souhlas se zpracováním písemně nebo
                    elektronicky na adresu nebo e-mail správce uvedený v čl. III
                    těchto podmínek.
                  </li>
                </ul>
              </li>
              <li>
                Dále máte právo podat stížnost u Úřadu pro ochranu osobních
                údajů v případě, že se domníváte, že bylo porušeno Vaše právo na
                ochranu osobních údajů, případně se obrátit na soud.
              </li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Podmínky zabezpečení osobních údajů</h2>
            <p></p>
            <ol>
              <li>
                Správce prohlašuje, že přijal veškerá vhodná technická a
                organizační opatření k zabezpečení osobních údajů.
              </li>
              <li>
                Správce přijal technická opatření k zabezpečení datových
                úložišť.
              </li>
              <li>
                Správce prohlašuje, že k osobním údajům mají přístup pouze jím
                pověřené osoby.
              </li>
            </ol>
            <p></p>
          </li>
          <li>
            <h2>Závěrečná ustanovení</h2>
            <p></p>
            <ol>
              <li>
                Odesláním objednávky z internetového objednávkového formuláře
                potvrzujete, že jste seznámen/a s podmínkami ochrany osobních
                údajů a že je v celém rozsahu přijímáte.
              </li>
              <li>
                Správce je oprávněn tyto podmínky změnit. Novou verzi podmínek
                ochrany osobních údajů zveřejní na svých internetových
                stránkách.
              </li>
              <li>Tyto podmínky nabývají účinnosti dnem 8.8.2021</li>
            </ol>
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
