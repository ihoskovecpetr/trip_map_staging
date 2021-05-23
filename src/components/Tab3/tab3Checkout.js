/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx, Button } from "theme-ui";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";

import { createUploadRequest } from "../../LibGlobal/createUploadRequest";
import { drawLayout } from "../../LibGlobal/drawLayout";
import CheckoutCard from "../CheckoutCard/CheckoutCard";
import NextTabBtn from "../NextTabBtn/NextTabBtn";
import { getPriceAlgorithm } from "../../LibGlobal/priceAlgorithm/getPriceAlgorithm";

import {
  getLazyUploader,
  resetPendingPromise,
} from "../../LibGlobal/getLazyUploader";

toast.configure();

function takeScreenshot(mapLocal) {
  return new Promise(function (resolve, _) {
    mapLocal.once("render", function () {
      resolve(mapLocal.getCanvas().toDataURL());
    });

    /* trigger render */
    mapLocal.setBearing(mapLocal.getBearing());
  });
}

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
  const [imageBase64, setImageBase64] = useState("");
  const [imageSavedResponse, setImageSavedResponse] = useState(null);
  const [percentageUpload, setPercentageUpload] = useState(0);

  useEffect(() => {
    setImageSavedResponse(null);
    resetPendingPromise();
  }, [map, mapTitles, activeLayout, product, activeMapStyle]);

  const createImage = async () => {
    return new Promise((resolve, reject) => {
      takeScreenshot(map).then(function (data) {
        console.log("takeScreenshot DONE");
        var image = new Image();

        image.onload = function () {
          const mergerCanvas = document.getElementById("canvas_merging");
          mergerCanvas.setAttribute("height", image.height);
          mergerCanvas.setAttribute("width", image.width);
          var ctx = mergerCanvas.getContext("2d");
          ctx.drawImage(image, 0, 0);

          drawLayout(ctx, {
            width: image.width,
            height: image.height,
            activeLayout,
            mapTitles,
            product,
            isProductionPrint: true,
          });
          resolve(mergerCanvas.toDataURL());
        };

        image.src = data;
      });
    });
  };

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
      const finalImgSrc = await createImage();

      const head = "data:image/png;base64,";

      const imgFileSizeMB = Math.round(
        ((finalImgSrc.length - head.length) * 3) / 4 / 1000000
      );

      let originalVarId = product.variantId;

      console.log({ originalVarId });

      console.log({ finalImgSrc, imgFileSizeMB });

      setImageBase64(finalImgSrc);
      const response = await createUploadRequest(
        finalImgSrc,
        progressCallbackFce
      );
      console.log("Ulozeni Response: ", {
        response,
        originalVarId,
        prodId: product.variantId,
      });

      if (response.data.secure_url) {
        console.log("✅ successful upload!");
        toast("Info: ✔️ uloženo, můžete pokračovat", {
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
      <div sx={styles.absoluteBtnWrap}>
        <NextTabBtn
          onClick={() => {
            setBackdropOpen(true);
            lazyUploadImage();
          }}
          margin="20px 0px 75px"
          price={priceWithDelivery.netPrice} //TODO add big.js
        >
          Shrnutí objednávky
        </NextTabBtn>
      </div>

      <img id="img_screen_shot" sx={styles.resultImage} />
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
          setIsUploadPending={setIsUploadPending}
          product={product}
          mapTitles={mapTitles}
          imageSavedResponse={imageSavedResponse}
          imageBase64={imageBase64}
          // shippingInfoObject={shippingInfoObject}
          // isShippingInfoLoading={isShippingInfoLoading}
          backdropClose={backdropClose}
          percentageUpload={percentageUpload}
        />
      </Backdrop>
    </div>
  );
}

const styles = {
  container: {
    margin: "50px 0",
    "& p": {
      fontFamily: "Arial, sans-serif",
      margin: 0,
    },
  },
  payRow: {
    padding: "10px",
    width: "100%",
  },
  absoluteBtnWrap: {
    position: "fixed",
    top: "85vh",
    left: "0px",
    width: ["100%", "100%", "100%", "40%"],
  },
  resultImage: {
    width: "100%",
    backgroundColor: "green",
    zIndex: 10,
  },
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: "10 !important",
    color: "#fff",
  },
  rootBackdrop: {
    zIndex: "12 !important",
  },
}));
