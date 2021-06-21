/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, Button } from "theme-ui";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";

import { createUploadRequest } from "../../LibGlobal/createUploadRequest";
import CheckoutCard from "../CheckoutCard/CheckoutCard";
import NextTabBtn from "../NextTabBtn/NextTabBtn";
import { getPriceAlgorithm } from "../../LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { createFinalImage } from "../../LibGlobal/createFinalImage";

import {
  getLazyUploader,
  resetPendingPromise,
} from "../../LibGlobal/getLazyUploader";

toast.configure();

export default function Tab3Checkout({
  map,
  mapTitles,
  activeLayout,
  product,
  activeMapStyle,
  dataPrintful,
}) {
  const classes = useStyles();

  const [backdropOpen, setBackdropOpen] = useState(false);
  const [isUploadPending, setIsUploadPending] = useState(false);
  const [imageBase64Created, setImageBase64Created] = useState("");
  const [imageSavedResponse, setImageSavedResponse] = useState(null);
  const [percentageUpload, setPercentageUpload] = useState(0);

  useEffect(() => {
    setImageSavedResponse(null);
    resetPendingPromise();
  }, [map, mapTitles, activeLayout, product, activeMapStyle]);

  const progressCallbackFce = (progressEvent) => {
    var percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );

    setPercentageUpload(percentCompleted);
  };

  const uploadImage = async () => {
    try {
      setBackdropOpen(true);
      setIsUploadPending(true);
      const finalImgSrc = await createFinalImage(
        map,
        activeLayout,
        mapTitles,
        product
      );

      setImageBase64Created(finalImgSrc);

      // const head = "data:image/png;base64,";
      // const imgFileSizeMB = Math.round(
      //   ((finalImgSrc.length - head.length) * 3) / 4 / 1000000
      // );
      // let originalVarId = product.variantId;

      const response = await createUploadRequest(
        finalImgSrc,
        progressCallbackFce
      );

      if (response.data.secure_url) {
        console.log("✅ successful upload!");
        toast(" ✔️ uloženo, můžete pokračovat", {
          type: "success",
          position: "top-left",
        });

        setIsUploadPending(false);
        setImageSavedResponse(response.data);

        return response.data;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const lazyUploadImage = () => {
    return getLazyUploader(
      () => imageSavedResponse,
      () => uploadImage()
    )();
  };

  const backdropClose = () => {
    setBackdropOpen(false);
  };

  const priceAlgorithm = getPriceAlgorithm();

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    product.variantId,
    dataPrintful
  );
  return (
    <div sx={styles.container}>
      <div>
        <NextTabBtn
          onClick={() => {
            setBackdropOpen(true);
            lazyUploadImage();
          }}
          price={priceWithDelivery.netPrice} //TODO add big.js
        >
          Shrnutí objednávky
        </NextTabBtn>
      </div>

      <img id="img_screen_shot" sx={styles.resultImage} />
      {backdropOpen && (
        <Backdrop
          className={classes.backdrop}
          classes={{
            root: classes.rootBackdrop, // class name, e.g. `classes-nesting-root-x`
          }}
          open={backdropOpen}
          onClick={backdropClose}
        >
          <CheckoutCard
            isUploadPending={isUploadPending}
            product={product}
            mapTitles={mapTitles}
            imageSavedResponse={imageSavedResponse}
            imageBase64Created={imageBase64Created}
            backdropClose={backdropClose}
            percentageUpload={percentageUpload}
          />
        </Backdrop>
      )}
    </div>
  );
}

const styles = {
  container: {
    "& p": {
      fontFamily: "Arial, sans-serif",
      margin: 0,
    },
  },
  resultImage: {
    width: "100%",
    backgroundColor: "green",
    zIndex: 10,
    display: "none",
  },
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: "10 !important",
    color: "#fff",
    display: "flex",
  },
  rootBackdrop: {
    zIndex: "12 !important",
  },
}));
