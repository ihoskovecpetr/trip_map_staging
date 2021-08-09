/** @jsx jsx */
import { jsx, Heading, Box, Container, Text } from "theme-ui";
import { Link } from "components/link";
import { footerObj } from "./footer.data";
export default function Footer() {
  return (
    <footer sx={styles.footer}>
      <Container sx={styles.footer.container}>
        <Box sx={styles.footer.footerTopArea}>
          {footerObj.map(({ header, items, pathHeader }, i) => (
            <Box sx={styles.footer.menus} key={i}>
              <Heading sx={styles.footer.heading}>
                <Link
                  path={pathHeader}
                  key={i}
                  label={header}
                  // sx={styles.footer.link}
                >
                  {header}
                </Link>
              </Heading>
              <nav>
                {items.map(({ path, label }, i) => (
                  <Link
                    path={path}
                    key={i}
                    label={label}
                    sx={styles.footer.link}
                  />
                ))}
              </nav>
            </Box>
          ))}
        </Box>
      </Container>
      <Text sx={styles.footer.copyright}>
        © TripMap {new Date().getFullYear()}
      </Text>
    </footer>
  );
}

const styles = {
  footer: {
    container: {
      width: "100%",
      alignItems: "stretch",
    },
    footerTopArea: {
      borderTop: "1px solid",
      borderTopColor: "whitish_paper_blue",
      display: "flex",
      flexWrap: "wrap",
      pt: [7, null, 8],
      pb: ["10px", null, null, "20px"],
      px: [0, null, null, null, 4],
    },
    menus: {
      width: ["50%", null, null, "30%"],
      display: "flex",
      flexDirection: "column",
      mb: ["40px", null, null, "60px"],
    },

    heading: {
      fontSize: [3, null, null, 4],
      color: "text_secondary",
      fontWeight: "500",
      mb: [3, 4, 5, null, 6],
      lineHeight: "1.35",
      textDecoration: "none",
      a: {
        textDecoration: "none",
        color: "inherit",
      },
      "&:hover": {
        color: "cta_color",
      },
    },

    link: {
      fontSize: ["14px", null, 1],
      color: "text",
      fontWeight: "body",
      mb: 2,
      cursor: "pointer",
      transition: "all 0.35s",
      display: "block",
      textDecoration: "none",
      lineHeight: [1.5, null, null, 1.6, 1.8],
      ":hover": {
        color: "cta_color",
      },
      ":last-child": {
        mb: "0px",
      },
    },
    copyright: {
      fontSize: ["14px", null, 1],
      width: "100%",
      textAlign: "center",
      p: ["20px 20px"],
      backgroundColor: "#FCFDFE",
      color: "text",
      a: {
        textDecoration: "none",
        color: "inherit",
        pl: 1,
        transition: "all 0.25s",
        "&:hover": {
          color: "primary",
        },
      },
    },
  },
};
