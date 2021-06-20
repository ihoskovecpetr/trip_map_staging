/** @jsx jsx */
import { useEffect } from "react";
import { jsx, Text } from "theme-ui";
import produce from "immer";

import NextTabBtn from "../NextTabBtn/NextTabBtn";
import { useIsMobile } from "../../Hooks/useIsMobile";
import { orientationSwitcher } from "../../LibGlobal/getOrientationSwitcher";

export default function Step2Orientation({ nextTab, product, setProduct }) {
  const { isMobile } = useIsMobile();

  const isProductWide = (product) => {
    if (product.sizeObject.ratio < 1) {
      return true;
    }
    return false;
  };

  const switchOrientation = () => {
    orientationSwitcher(product, setProduct);
  };

  return (
    <div sx={styles.container}>
      {!isMobile && (
        <Text as="p" className="description" sx={styles.headingDesc}>
          Orientace
        </Text>
      )}

      <div sx={styles.orientationWrap}>
        <div sx={styles.orientationShapeItems}>
          <div>
            <div
              sx={styles.highMock}
              onClick={switchOrientation}
              className={!isProductWide(product) && "active"}
            ></div>
          </div>
          <div>
            <div
              sx={styles.wideMock}
              onClick={switchOrientation}
              className={isProductWide(product) && "active"}
            ></div>
          </div>
        </div>
        <div sx={styles.textsItems}>
          <p
            onClick={switchOrientation}
            className={!isProductWide(product) && "active"}
          >
            Na výšku
          </p>

          <p
            onClick={switchOrientation}
            className={isProductWide(product) && "active"}
          >
            Na šířku
          </p>
        </div>
      </div>

      {!isMobile && (
        <Text as="p" className="description" sx={styles.topDescription}>
          <b>Tip!</b> Pro změnu nadpisu a podnadpisu klikněte přímo na mapu
        </Text>
      )}

      {/* <NextTabBtn
        onClick={() => {
          nextTab();
        }}
        width="100%"
        margin="0px 0px"
      >
        Další krok
      </NextTabBtn> */}
      {/* <div sx={styles.absoluteBtnWrap}>
        <NextTabBtn
          onClick={() => {
            nextTab();
          }}
          margin="20px 0px 75px"
        >
          Další krok
        </NextTabBtn>
      </div> */}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    position: "relative",
    paddingTop: "5px",
  },
  headingDesc: {
    fontWeight: 500,
    textAlign: "left",
    color: "grey",
    margin: "20px 0",
    letterSpacing: "1.1px",
  },

  orientationWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  orientationShapeItems: {
    width: ["100%", "60%", "60%", "100%", "100%", "100%", "100%"],
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    "> div": {
      width: "30%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "> div > div": {
      cursor: "pointer",
      boxShadow: "0 0 5px rgba(0,0,0,0.2)",
    },
    "> div > div.active": {
      border: "2px solid",
      borderColor: "cta_color",
      pointerEvents: "none",
      cursor: "default",
      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
      transform: "scale(1.2)",
    },
  },
  highMock: {
    border: "1px solid black",
    height: "50px",
    width: "25px",
    backgroundColor: "white",
  },
  wideMock: {
    border: "1px solid black",
    height: "25px",
    width: "50px",
    backgroundColor: "white",
  },

  textsItems: {
    width: ["100%", "60%", "60%", "100%", "100%", "100%", "100%"],
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    letterSpacing: "1.1px",
    fontWeight: "100",
    textTransform: "uppercase",
    fontSize: "14px",
    "> p": {
      my: 1,
      cursor: "pointer",
    },
    "> p.active": {
      color: "cta_color",
      pointerEvents: "none",
      cursor: "default",
    },
  },

  // absoluteBtnWrap: {
  //   position: "fixed",
  //   top: ["85vh", "85vh", "85vh", "90vh"],
  //   left: "0px",
  //   height: 0,
  //   width: ["100%", "100%", "100%", "40%", "30%"],
  // },

  topDescription: {
    margin: "20px 0px",
    fontWeight: 100,
    "& b": {
      color: "grey",
      fontWeight: 500,
    },
  },
};
