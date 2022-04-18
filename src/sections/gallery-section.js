/** @jsx jsx */
import { jsx } from "theme-ui";
import { Container, Grid } from "theme-ui";
import Gallery from "react-grid-gallery";
import { useIsMobile } from "Hooks/useIsMobile";

import SectionHeader from "../components/section-header";
import { useTranslation } from "Hooks/useTranslation";

const Europe = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/europe_interier_gvweep.webp",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/europe_interier_gvweep.webp",
};

const Manhattan_bike = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interier_bike_black_vjxj5a.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interier_bike_black_vjxj5a.png",
};

const Manhattan_interier = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/manhattan_interier_ueejsd.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/manhattan_interier_ueejsd.png",
};

const Europe_nice = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1400,c_scale/Finished%20Interiers/europe_interier_vb4pjf.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/europe_interier_vb4pjf.png",
};

const Europe_raw = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1400,c_scale/Finished%20Interiers/europe_d03fol.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/europe_d03fol.png",
};

const Iceland = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/iceland_yipwns.webp",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/iceland_yipwns.webp",
};

const Hong_Kong = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/hk_mirrors_lh0b3x.webp",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/hk_mirrors_lh0b3x.webp",
};

const Italy_red = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/interier_italy_hl7h9t.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/interier_italy_hl7h9t.png",
};

const Italy_red_raw = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/Finished%20Interiers/italy_jkv0pi.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/italy_jkv0pi.png",
};

const SF_interier = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/sf_interier_gh719q.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/sf_interier_gh719q.png",
};

const SF_raw = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/sf_po1im4.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/sf_po1im4.png",
};

const Rio_interier = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/rio_inteiror_nscbq4.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/rio_inteiror_nscbq4.png",
};

const Rio_raw = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1200,c_scale/rio_ijdsfi.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/rio_ijdsfi.png",
};

const Bostom_raw = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1600,c_scale/Finished%20Interiers/boston_o7texj.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/Finished%20Interiers/boston_o7texj.png",
};

const Bostom_interier = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1600,c_scale/boston_interior_gr83vd.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/boston_interior_gr83vd.png",
};

const Manhattan_raw = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1600,c_scale/manhattan_sv4vvl.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/manhattan_sv4vvl.png",
};

const Germany_raw = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1600,c_scale/germany_hnfvz0.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/germany_hnfvz0.png",
};

const HK_raw = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1600,c_scale/hk_am1hr5.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/hk_am1hr5.png",
};

const Germany_interier = {
  src:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_1600,c_scale/germany_interier_uw9wyg.png",
  thumbnail:
    "https://res.cloudinary.com/dkyt8girl/image/upload/h_300,c_scale/germany_interier_uw9wyg.png",
};

const imagesArr = [
  Bostom_interier,
  Bostom_raw,
  Hong_Kong,
  HK_raw,
  Germany_interier,
  Germany_raw,
  SF_interier,
  SF_raw,
  Rio_interier,
  Rio_raw,
  Manhattan_interier,

  Manhattan_raw,
  Italy_red,
  Italy_red_raw,
  Manhattan_bike,
  Europe_nice,
  Europe_raw,
  Europe,
  Iceland,
];

const imagesWithOptions = imagesArr.map((image) => ({
  ...image,
  // thumbnailHeight: 124,
  // thumbnailWidth: 250,
}));

export default function KeyFeature() {
  const { isMobile } = useIsMobile();
  const t = useTranslation();

  return (
    <section sx={{ variant: "section.keyFeature" }} id="feature">
      <Container sx={styles.containerThemUI}>
        <SectionHeader
          slogan={t("gallery.subtitle")}
          title={t("gallery.title")}
        />
        <Grid sx={styles.gridCenter}>
          <Gallery
            images={imagesWithOptions}
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
