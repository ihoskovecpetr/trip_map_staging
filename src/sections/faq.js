/** @jsx jsx */
import { jsx, Container, Box } from "theme-ui";
import SectionHeader from "components/section-header";
import Accordion from "components/accordion/accordion";
const faqs = [
  {
    title: "Jakou kvalitu tisku a papíru mohu očekávat?",
    contents: (
      <div>
        Kvalta tisku je hodná muzea, tisk je proveden na matný trvanlivý papír s
        vysokou gramáží. Každý plakát je tištěn pigmentovou technologií na
        archivovatelný, bez-acidický papír který tím získá skvělý výsledný
        vzhled. Konečný produkt rozzáří každou místnost.
      </div>
    ),
  },
];
export default function Faq() {
  return (
    <section sx={{ variant: "section.faq" }}>
      <Container>
        <SectionHeader title="Často kladené otázky" slogan="Získej odpovědi" />
        <Box
          sx={{
            display: "flex",
            width: ["100%", null, null, "650px", "745px"],
            flexDirection: "column",
            mx: "auto",
            my: -4,
          }}
        >
          <Accordion items={faqs} />
        </Box>
      </Container>
    </section>
  );
}
