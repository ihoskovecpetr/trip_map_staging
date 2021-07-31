/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { jsx } from "theme-ui";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import styled from "styled-components";
import axios from "axios";

import { VARIANTS_PRINTFUL } from "constants/constants";
import { createUploadRequest } from "LibGlobal/createUploadRequest";
import CheckoutPopupBody from "./CheckoutPopupBody";
import NextTabBtn from "../NextTabBtn/NextTabBtn";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { useQualityImageCreator } from "Hooks/useQualityImageCreator";

import {
  getLazyUploader,
  resetPendingPromise,
} from "LibGlobal/getLazyUploader";

const CancelToken = axios.CancelToken;

export default function CheckoutCta({
  map,
  mapTitles,
  activeLayoutName,
  product,
  activeMapStyleName,
  children,
  isCustomUI,
}) {
  const classes = useStyles();

  const [backdropOpen, setBackdropOpen] = useState(false);
  const [isUploadPending, setIsUploadPending] = useState(false);
  const [imageBase64Created, setImageBase64Created] = useState("");
  const [imageSavedResponse, setImageSavedResponse] = useState(null);
  const [percentageUpload, setPercentageUpload] = useState(0);
  const [fileSizeMB, setFileSizeMB] = useState(0);
  const [axiosCancelTokenSource, setAxiosCancelTokenSource] = useState(
    CancelToken.source()
  );
  const qualityImageCreator = useQualityImageCreator();

  const { dataPrintful } = useGetDataPrintful(
    VARIANTS_PRINTFUL.map((variant) => variant.id)
  );

  const center = map?.getCenter().toString();

  useEffect(() => {
    setImageSavedResponse(null);
    setImageBase64Created(null);
    resetPendingPromise();
    setPercentageUpload(0);
  }, [map, center, mapTitles, activeLayoutName, product, activeMapStyleName]);

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

      const finalImgSrc = await qualityImageCreator({
        map,
        activeLayoutName,
        mapTitles,
        product,
        activeMapStyleName,
        options: {
          isPreview: false,
        },
      });

      const img = finalImgSrc;
      const buffer = Buffer.from(img.substring(img.indexOf(",") + 1));

      setFileSizeMB(Number(buffer.length / 1e6).toPrecision(2));

      setImageBase64Created(finalImgSrc);

      const response = await createUploadRequest(
        finalImgSrc,
        progressCallbackFce,
        axios,
        axiosCancelTokenSource
      );

      if (response.data.secure_url) {
        console.log("✅ successful_upload!");
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
    resetPendingPromise();
    axiosCancelTokenSource?.cancel("Request canceled on users order");
    setAxiosCancelTokenSource(CancelToken.source());
  };

  const priceAlgorithm = getPriceAlgorithm();

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    product.variantId,
    dataPrintful
  );

  return (
    <CheckoutWrap>
      {isCustomUI && (
        <CustomUI
          onClick={() => {
            console.log("settingBacOpn");
            setBackdropOpen(true);
            lazyUploadImage();
          }}
        >
          {children}
        </CustomUI>
      )}
      {!isCustomUI && (
        <DefaultUI>
          <NextTabBtn
            onClick={() => {
              setBackdropOpen(true);
              lazyUploadImage();
            }}
            price={priceWithDelivery.netPrice} //TODO add big.js
          >
            SHRNUTÍ OBJEDNÁVKY
          </NextTabBtn>
        </DefaultUI>
      )}

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
          <CheckoutPopupBody
            isUploadPending={isUploadPending}
            product={product}
            mapTitles={mapTitles}
            imageSavedResponse={imageSavedResponse}
            imageBase64Created={imageBase64Created}
            backdropClose={backdropClose}
            percentageUpload={percentageUpload}
            activeLayoutName={activeLayoutName}
            activeMapStyleName={activeMapStyleName}
            fileSizeMB={fileSizeMB}
          />
        </Backdrop>
      )}
    </CheckoutWrap>
  );
}

const styles = {
  // container: {
  //   "& p": {
  //     fontFamily: "Arial, sans-serif",
  //     margin: 0,
  //   },
  // },
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

const CheckoutWrap = styled.div`
  width: 100%;

  & p {
    margin: 0;
  }
`;

const CustomUI = styled.div`
  width: 100%;
`;

const DefaultUI = styled.div`
  width: 100%;
  // padding: 15px 0;
`;
