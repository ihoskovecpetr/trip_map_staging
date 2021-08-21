/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Grid } from "theme-ui";
import Gallery from "react-grid-gallery";

import SectionHeader from "../components/section-header";
import FeatureCardColumn from "components/feature-card-column.js";
import Vector from "assets/key-feature/vector.svg";
import Editing from "assets/key-feature/editing.svg";
import Speed from "assets/key-feature/speed.svg";

// import Interier1_ORIG from "assets/interiorGallery/int_glass_black.jpg";

const InterierPink1 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066257/pink_wall_black_dwxsse.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/pink_wall_black_dwxsse.jpg",
};
const InterierPink2 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066268/pink_wall_white_f30cln.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/pink_wall_white_f30cln.jpg",
};
const InterierPink3 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066269/pink_wall_yellow_sa5hcq.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/pink_wall_yellow_sa5hcq.jpg",
};

const InterierYellow1 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066262/yallow_wall_black_hpnhpc.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/yallow_wall_black_hpnhpc.jpg",
};
const InterierYellow2 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066272/yellow_wall_orange_bqmpfa.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/yellow_wall_orange_bqmpfa.jpg",
};

const InterierBike1 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066215/interior_bike_white_wjcag7.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_bike_white_wjcag7.png",
};

const InterierBike2 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066218/interior_bike_black_n9bt8r.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_bike_black_n9bt8r.png",
};

const InterierBike3 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066218/interior_bike_orange_vsrhl3.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_bike_orange_vsrhl3.png",
};

const InterierChair1 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066186/interior_wide_chair_black_tajfhl.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_wide_chair_black_tajfhl.jpg",
};

const InterierChair2 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066200/interior_wide_chair_yellow_uuaihd.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_wide_chair_yellow_uuaihd.png",
};

const InterierChair3 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627066202/interior_wide_chair_white_j6rmgx.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_wide_chair_white_j6rmgx.png",
};

const InterierGlassy1 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627062815/int_glass_orange_dwkqpw.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/int_glass_orange_dwkqpw.jpg",
};
const InterierGlassy2 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627062810/int_glass_yellow_bilorf.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/int_glass_yellow_bilorf.jpg",
};

const InterierGlassy3 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627062810/int_glass_black_giw3wo.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/int_glass_black_giw3wo.jpg",
};
const InterierGlassy4 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1627062809/int_glass__white_f7g8h1.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/int_glass__white_f7g8h1.jpg",
};

const InterierWallBerlin = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565425/Finished%20Interiers/wall_brick_berlin_hfq8uv.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/wall_brick_berlin_hfq8uv.jpg",
};

const imagesArr = [
  InterierChair1,
  InterierPink2,
  InterierBike1,
  InterierYellow1,
  InterierChair2,
  InterierBike2,
  InterierBike3,
  InterierChair3,
  //   InterierYellow2,
  InterierPink1,
  //   InterierPink3,
  InterierGlassy1,
  //   InterierGlassy2,
  InterierGlassy3,
  //   InterierGlassy4,
  InterierWallBerlin,
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
