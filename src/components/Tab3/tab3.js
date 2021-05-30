/** @jsx jsx */
import { useEffect, useState } from "react";
import { jsx, Text, Button, Link } from "theme-ui";
import Lightbox from "react-image-lightbox";
import OpenWithIcon from "@material-ui/icons/OpenWith";

import { VARIANTS_PRINTFUL, SIZES } from "../../constants/constants";
import Tab3Checkout from "./tab3Checkout";
import CustomLoader from "../CustomLoader";

import { useGetDataPrintful } from "../../Hooks/useGetDataPrintful";
import { getVersionDescription } from "../../LibGlobal/getVersionDescription";
import { getPriceAlgorithm } from "../../LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { getFormattedPrice } from "../../LibGlobal/getFormattedPrice";

const priceAlgorithm = getPriceAlgorithm();

export default function Tab3({
  map,
  mapTitles,
  activeLayout,
  product,
  setProduct,
  activeMapStyle,
}) {
  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );

  //TODO single size can have multiple vriants..could switch to different variant
  const findVariant = (newSize) => {
    const currentFrameName = VARIANTS_PRINTFUL.find(
      (variant) => variant.id === product.variantId
    )?.frameName;

    return VARIANTS_PRINTFUL.find(
      (variant) =>
        variant.sizeName === newSize && variant.frameName === currentFrameName
    );
  };

  const findNewSizeSameOrientation = (newSizeCode) =>
    SIZES.find(
      (size) =>
        size.acceptableSizes.includes(newSizeCode) &&
        size.orientation === product.sizeObject.orientation
    );

  const setNewProduct = (sizeCode) => {
    const newVariant = findVariant(sizeCode);

    const newSizeObject = findNewSizeSameOrientation(sizeCode);

    setProduct((prev) => ({
      ...prev,
      sizeObject: newSizeObject,
      variantId: newVariant.id,
      price: dataPrintful[newVariant.id]?.price,
      priceWithDelivery: priceAlgorithm.getPriceWithDelivery(
        newVariant.id,
        dataPrintful
      ).netPrice,
      shippingCode: newVariant.shipping.codeCZ,
    }));
  };

  const setNewFrame = (variantId, shippingCode) => {
    //TODO there has to be price, otherwise return?
    setProduct((prev) => ({
      ...prev,
      variantId: variantId,
      price: dataPrintful[variantId]?.price,
      priceWithDelivery: priceAlgorithm.getPriceWithDelivery(
        variantId,
        dataPrintful
      ).netPrice,
      shippingCode,
    }));
  };

  const sizesArray = VARIANTS_PRINTFUL.map((variant) => variant.sizeName);
  const arrSingleSizeNames = Array.from(new Set(sizesArray));

  const variantsPrintfulForSize = VARIANTS_PRINTFUL.filter((variant) => {
    const isVariantForOffer =
      product.sizeObject.acceptableSizes.includes(variant.sizeName) &&
      dataPrintful &&
      dataPrintful[variant.id]?.availableEU;
    return isVariantForOffer;
  });

  return (
    <div sx={styles.container}>
      <Text as="p" className="description" sx={styles.headingDesc}>
        Rozměry
      </Text>

      <div sx={styles.sizeWrap}>
        {dataPrintful &&
          arrSingleSizeNames.map((sizeNameLocal) => {
            return (
              <div
                className={
                  product.sizeObject.acceptableSizes.includes(sizeNameLocal) &&
                  "active"
                }
                sx={styles.sizeItem}
                onClick={() => setNewProduct(sizeNameLocal)}
              >
                <p sx={styles.itemText}>
                  {SIZES.find((size) => size.code === sizeNameLocal)?.name}
                </p>
              </div>
            );
          })}
      </div>

      <Text as="p" className="description" sx={styles.headingDesc}>
        Rámování
      </Text>
      {variantsPrintfulForSize.length === 0 && (
        <div sx={styles.loaderWrap}>
          <CustomLoader />
        </div>
      )}
      {variantsPrintfulForSize.length > 0 && (
        <div sx={styles.variantWrap}>
          {variantsPrintfulForSize.map(({ id: variantId, shipping }) => (
            <div
              sx={styles.borderWrap}
              className={product.variantId === variantId && "active"}
              onClick={() => setNewFrame(variantId, shipping.codeCZ)}
            >
              <div sx={styles.imageWrap}>
                <img
                  sx={styles.variantImage}
                  src={dataPrintful[variantId]?.url}
                />
                {/* <OpenWithIcon
                  sx={styles.openImageIcon}
                  onClick={(e) => {
                    setLightbox({
                      open: true,
                      activeSrc: dataPrintful[variantId]?.url,
                    });
                    e.stopPropagation();
                  }}
                /> */}
              </div>
              <div sx={styles.textsWrap}>
                <p sx={styles.variantPrice}>
                  {/* {dataPrintful[variantId]?.currency}{" "} */}

                  {getFormattedPrice(
                    priceAlgorithm.getPriceWithoutDelivery(
                      variantId,
                      dataPrintful
                    ).netPrice
                  )}
                </p>
                <p sx={styles.variantDesc}>
                  {getVersionDescription(variantId)}
                </p>
                <p sx={styles.variantDelivery}>
                  {/* {dataPrintful[variantId]?.shipping.currency} */}
                  {`+ ${getFormattedPrice(
                    priceAlgorithm.getPriceOfDelivery(variantId, dataPrintful)
                      .netPrice
                  )} doprava`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Text as="p" className="description" sx={styles.headingDesc}>
        Materiál pro tisk
      </Text>

      <p sx={styles.materialDesc}>{product.materialDesc}</p>

      <Tab3Checkout
        map={map}
        mapTitles={mapTitles}
        activeLayout={activeLayout}
        product={product}
        activeMapStyle={activeMapStyle}
        dataPrintful={dataPrintful}
      />

      {lightbox.open && (
        <Lightbox
          mainSrc={lightbox.activeSrc}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    padding: "10px",
    pb: "70px",
  },
  headingDesc: {
    fontWeight: 700,
    textAlign: "left",
    margin: "10px",
  },
  TabWrap: {
    display: "flex",
    width: "100%",
  },
  Tab: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    "&.active": {
      borderBottom: "3px solid black",
    },
  },

  sizeWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  sizeItem: {
    margin: "2%",
    padding: "4px",
    display: "flex",
    justifyContent: "space-around",
    border: "1px solid black",
    cursor: "pointer",
    backgroundColor: "white",
    "&.active": {
      border: "2px solid",
      borderColor: "cta_color",
      color: "black",
    },
    "&.disabled": {
      border: "0px",
      color: "lightGrey",
    },
  },
  itemText: {
    margin: 0,
    paddingTop: "5px",
  },
  materialDesc: {
    textAlign: "left",
    px: "10px",
  },

  loaderWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    minHeight: "20vh",
    justifyContent: "center",
    alignItems: "center",
  },

  variantWrap: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    minHeight: "20vh",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  borderWrap: {
    // border: "2px solid white",
    boxShadow: "1px 1px 4px rgba(0,0,0,0.2)",
    // borderRadius: "2px",
    height: "100%",
    width: ["46%", "31%", "31%", "46%", "46%", "31%"],
    margin: ["2%", "1%", "1%", "2%", "2%", "1%"],
    // padding: "4px",
    // height: "200px",
    borderRadius: "10px",
    display: "flex",
    cursor: "pointer",
    flexDirection: "column",
    backgroundColor: "white",
    overflow: "hidden",

    "&.active": {
      border: "2px solid",
      borderColor: "cta_color",

      boxShadow: "3px 3px 5px rgba(0,0,0,0.3)",
    },
  },
  imageWrap: {
    position: "relative",
    // height: "80%",
    display: "flex",
    justifyContent: "center",
  },
  variantImage: {
    position: "relative",
    height: "170px",
  },
  // openImageIcon: {
  //   position: "absolute",
  //   top: 0,
  //   right: 0,
  //   backgroundColor: "#00000029",
  //   borderRadius: "2px",
  //   cursor: "pointer",
  // },
  textsWrap: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "flex-start",
    padding: "5px",
    textAlign: "left",
  },
  variantPrice: {
    margin: 0,
    // px: "5px",
    // mx: "2px",
    // position: "absolute",
    // bottom: 0,
    // right: 0,
    color: "primary",
    fontWeight: 600,
    // backgroundColor: "#ffffffe9",
    borderRadius: "2px",
    cursor: "pointer",
    // color: "white",

    // "&.active": {
    //   color: "#fe6769",
    // },
  },
  variantDesc: {
    lineHeight: 1.2,
    fontSize: "0.8rem",
    fontWeight: 500,
    paddingBottom: "5px",
    // borderBottom: "1px solid lightGrey",
    margin: 0,
  },
  variantDelivery: {
    color: "muted",
    m: 0,
    fontWeight: 600,
    fontSize: "0.6rem",
  },
};
