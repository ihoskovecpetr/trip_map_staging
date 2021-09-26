/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Grid } from "theme-ui";
import Gallery from "react-grid-gallery";
import { useIsMobile } from "Hooks/useIsMobile";

import SectionHeader from "../components/section-header";
import FeatureCardColumn from "components/feature-card-column.js";
import Vector from "assets/key-feature/vector.svg";
import Editing from "assets/key-feature/editing.svg";
import Speed from "assets/key-feature/speed.svg";

const InterierBike1 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/interior_bike_white_wjcag7.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_bike_white_wjcag7.png",
};

const InterierChair2 = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_800,c_scale/interior_wide_chair_yellow_uuaihd.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_wide_chair_yellow_uuaihd.png",
};

const RedWallBoston = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/red_window_white_pslvnb.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/red_window_white_pslvnb.jpg",
};

const Italy_inside = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/pexels-max-vakhtbovych-6585763_2_avwvrj.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/pexels-max-vakhtbovych-6585763_2_avwvrj.jpg",
};

const World_White = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/pexels-maksim-goncharenok-4352247_2_k1lw0i.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/pexels-maksim-goncharenok-4352247_2_k1lw0i.jpg",
};

const Europe_White = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/Evropa_elzyg9.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/Evropa_elzyg9.jpg",
};

const Greek_Black = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/blank-1868502_1920_3_m3elzu.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/blank-1868502_1920_3_m3elzu.jpg",
};

const Rio_green = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/restaurant_rio_vmp3ck.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/restaurant_rio_vmp3ck.jpg",
};

const Japan_cottage = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/japan-interier_mhqq5t.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/japan-interier_mhqq5t.jpg",
};

const Japan_table = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/blank-1868502_1920_2_fc4itd.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/blank-1868502_1920_2_fc4itd.jpg",
};

const imagesArr = [
  Japan_cottage,
  Europe_White,
  // InterierChair1,
  // WorkMacSippinRio,
  // WhiteBedBoston,
  // RestaurantGreenRio,
  RedWallBoston,
  Japan_table,
  // InterierYellow1,
  InterierChair2,
  World_White,
  InterierBike1,
  Italy_inside,
  Greek_Black,
  Rio_green,
];

const imagesWithOptions = imagesArr.map((image) => ({
  ...image,
  // thumbnailHeight: 124,
  // thumbnailWidth: 250,
}));

export default function KeyFeature() {
  const { isMobile } = useIsMobile();

  return (
    <section sx={{ variant: "section.keyFeature" }} id="feature">
      <Container>
        <SectionHeader
          slogan="Něco pro inspiraci"
          title="Galerie povedených interiérů"
        />
        <Grid sx={styles.gridCenter}>
          <Gallery
            images={imagesWithOptions}
            width={"100%"}
            backdropClosesModal={true}
            rowHeight={isMobile ? 120 : 180}
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
