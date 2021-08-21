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

const WorkChairWhiteOrange = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565561/Finished%20Interiers/work_home_multi_zwqpni.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/work_home_multi_zwqpni.jpg",
};

const WorkMacSippinRio = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565512/Finished%20Interiers/workdesk_rio_blue_nejmk7.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/workdesk_rio_blue_nejmk7.jpg",
};

const GreenSofaRio = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565270/Finished%20Interiers/green_sofa_sao_psjfsv.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/green_sofa_sao_psjfsv.jpg",
};

const LivingRoomTokyo = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565244/Finished%20Interiers/living_room_2_tokyo_nsuugl.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/living_room_2_tokyo_nsuugl.jpg",
};

const LivingRoomOrleans = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565250/Finished%20Interiers/living_room_2_orleans_orange_npjuvc.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/living_room_2_orleans_orange_npjuvc.jpg",
};

const WhiteBedBoston = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565303/Finished%20Interiers/living_room_boston_mqsxm9.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/living_room_boston_mqsxm9.jpg",
};

const RebuildHouseTokyo = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565356/Finished%20Interiers/rebuild_black_dehgzu.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/rebuild_black_dehgzu.jpg",
};

const RedWallBoston = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1000,c_scale/Finished%20Interiers/red_window_white_pslvnb.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/red_window_white_pslvnb.jpg",
};

const RestaurantGreenRio = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629572741/Finished%20Interiers/restaurant_rio_green_pgbrlw.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/restaurant_rio_green_pgbrlw.jpg",
};

const MessyWallSao = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/v1629565439/Finished%20Interiers/wall_brick_sao_paolo_ozakzo.jpg",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/wall_brick_sao_paolo_ozakzo.jpg",
};
const imagesArr = [
  // InterierChair1,
  WorkMacSippinRio,
  WhiteBedBoston,
  RestaurantGreenRio,
  RedWallBoston,
  InterierYellow1,
  InterierChair2,
  // InterierBike2,
  InterierBike3,
  // InterierChair3,
  //   InterierYellow2,
  InterierPink1,
  //   InterierPink3,
  InterierGlassy1,
  //   InterierGlassy2,
  InterierGlassy3,
  //   InterierGlassy4,
  InterierWallBerlin,
  WorkChairWhiteOrange,
  RebuildHouseTokyo,
  GreenSofaRio,
  LivingRoomTokyo,
  LivingRoomOrleans,
  InterierBike1,
  InterierPink2,
  MessyWallSao,
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
