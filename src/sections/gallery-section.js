/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Grid } from "theme-ui";
import Gallery from "react-grid-gallery";
import { useIsMobile } from "Hooks/useIsMobile";

import SectionHeader from "../components/section-header";

// const InterierBike1 = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/interior_bike_white_wjcag7.png",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_bike_white_wjcag7.png",
// };

// const InterierChair2 = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_800,c_scale/interior_wide_chair_yellow_uuaihd.png",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/interior_wide_chair_yellow_uuaihd.png",
// };

// const RedWallBoston = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/red_window_white_pslvnb.jpg",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/red_window_white_pslvnb.jpg",
// };

// const Italy_inside = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/pexels-max-vakhtbovych-6585763_2_avwvrj.jpg",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/pexels-max-vakhtbovych-6585763_2_avwvrj.jpg",
// };

// const World_White = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/pexels-maksim-goncharenok-4352247_2_k1lw0i.jpg",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/pexels-maksim-goncharenok-4352247_2_k1lw0i.jpg",
// };

// const Europe_White = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/Evropa_elzyg9.jpg",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/Evropa_elzyg9.jpg",
// };

// const Greek_Black = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/blank-1868502_1920_3_m3elzu.jpg",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/blank-1868502_1920_3_m3elzu.jpg",
// };

// const Rio_green = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/restaurant_rio_vmp3ck.jpg",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/restaurant_rio_vmp3ck.jpg",
// };

// const Japan_cottage = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/japan-interier_mhqq5t.jpg",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/japan-interier_mhqq5t.jpg",
// };

// const Japan_table = {
//   src:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/blank-1868502_1920_2_fc4itd.jpg",
//   thumbnail:
//     "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/blank-1868502_1920_2_fc4itd.jpg",
// };

const Europe = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_europe_gifnho.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_europe_gifnho.png",
};

const Prague = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_prague_rhpmtd.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_prague_rhpmtd.png",
};

const Manhattan_bike = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_bike_biyfnp.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_bike_biyfnp.png",
};

const Manhattan_white = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_manhattan_dqw1nz.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_manhattan_dqw1nz.png",
};

const Europe_nice = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_evropou_copy_is2ksw.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_evropou_copy_is2ksw.png",
};

const Iceland = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_iceland_lvvwgj.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_iceland_lvvwgj.png",
};

const Hong_Kong = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_mirror_la5tix.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_mirror_la5tix.png",
};

const Italy_red = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/Interior_italy_red_y1dn3v.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/Interior_italy_red_y1dn3v.png",
};

const Manhattan_balck_sofa = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_manhattan_balck_yfvpxi.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_manhattan_balck_yfvpxi.png",
};

const Rio = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_rio_ujlqig.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_rio_ujlqig.png",
};

const Sofa_SF = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interior_sf_ijmtqb.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interior_sf_ijmtqb.png",
};

const imagesArr = [
  Sofa_SF,
  Rio,
  Manhattan_white,
  Hong_Kong,
  Prague,
  Italy_red,
  Manhattan_bike,
  Europe_nice,
  Europe,
  Iceland,
  Manhattan_balck_sofa,
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
      <Container sx={styles.containerThemUI}>
        <SectionHeader
          slogan="Něco pro inspiraci"
          title="Galerie povedených interiérů"
        />
        <Grid sx={styles.gridCenter}>
          <Gallery
            images={imagesWithOptions}
            // width={"100%"}
            backdropClosesModal={true}
            rowHeight={isMobile ? 120 : 180}
          />
        </Grid>
      </Container>
    </section>
  );
}

const styles = {
  containerThemUI: {
    px: [0, null, null, "40px", null, "80px"],
  },
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
    width: ["100%", "100%", "100%"],
    // px: [null, null, null, "40px", null, "80px"],
    overflow: "hidden",
  },
};
