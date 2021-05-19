/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Grid } from "theme-ui";
import Gallery from "react-grid-gallery";

import SectionHeader from "../components/section-header";
import FeatureCardColumn from "components/feature-card-column.js";
import Vector from "assets/key-feature/vector.svg";
import Editing from "assets/key-feature/editing.svg";
import Speed from "assets/key-feature/speed.svg";

import Interier1 from "assets/interiorGallery/interior_bike.png";
import Interier2 from "assets/interiorGallery/interior_black_white.png";
import Interier3 from "assets/interiorGallery/interior_wide_chair.png";

// const data = [
//   {
//     id: 1,
//     imgSrc: Vector,
//     altText: "Vector",
//     title: "Vector Editing",
//     text:
//       "Get your blood tests delivered at home collect a sample from the your blood tests.",
//   },
//   {
//     id: 2,
//     imgSrc: Editing,
//     altText: "Monitoring",
//     title: "Customize & Monitoring",
//     text:
//       "Get your blood tests delivered at home collect a sample from the your blood tests.",
//   },
//   {
//     id: 3,
//     imgSrc: Speed,
//     altText: "Quality",
//     title: "Quality & Short-period",
//     text:
//       "Get your blood tests delivered at home collect a sample from the your blood tests.",
//   },
// ];

const imagesArr = [
  { src: Interier3, thumbnail: Interier3 },
  { src: Interier1, thumbnail: Interier1 },
  { src: Interier2, thumbnail: Interier2 },
];

export default function KeyFeature() {
  return (
    <section sx={{ variant: "section.keyFeature" }} id="feature">
      <Container>
        <SectionHeader
          slogan="Něco pro inspiraci"
          title="Galerie povedených interiérů"
        />
        <Grid sx={styles.gridCenter}>
          <Gallery
            images={imagesArr}
            width={"100%"}
            backdropClosesModal={true}
          />
        </Grid>
        {/* <Grid sx={styles.grid}>
          {data.map((item) => (
            <FeatureCardColumn
              key={item.id}
              src={item.imgSrc}
              alt={item.title}
              title={item.title}
              text={item.text}
            />
          ))}
        </Grid> */}
      </Container>
    </section>
  );
}

const styles = {
  grid: {
    px: [0, null, null, "40px", null, "80px"],
    pt: [0, null, null, null, null, null, null, 3],
    gridGap: ["35px 0", null, "40px 0"],
    gridTemplateColumns: [
      "repeat(1,1fr)",
      null,
      "repeat(2,1fr)",
      null,
      "repeat(3,1fr)",
    ],
    width: ["100%", "80%", "100%"],
    mx: "auto",
    "& > div": {
      px: [0, "15px", null, "25px", null, "30px", "40px", "60px"],
    },
  },
  gridCenter: {
    width: ["100%", "80%", "100%"],
    px: [0, null, null, "40px", null, "80px"],
    mx: "auto",
    overflow: "hidden",
  },
};
