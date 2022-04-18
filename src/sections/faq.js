/** @jsx jsx */
import { jsx, Container, Box } from "theme-ui";
import SectionHeader from "components/section-header";
import Accordion from "components/accordion/accordion";
import { useTranslation } from "Hooks/useTranslation";

const faqs = [
  {
    title: "faq.1.title",
    contents: "faq.1.text",
  },
  {
    title: "faq.2.title",
    contents: "faq.2.title",
  },
];
export default function Faq() {
  const t = useTranslation();

  return (
    <section sx={{ variant: "section.faq" }}>
      <Container>
        <SectionHeader title={t("faq.title")} slogan={t("faq.subtitle")} />
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
