/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";

import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";

import { color } from "utils";
import { getIsProduction } from "LibGlobal/getIsProduction";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import CheckoutItems from "./CheckoutItems";
import NextTabBtn from "../NextTabBtn/NextTabBtn";
import UnderlineLoader from "components/UnderlineLoader";
import { useProductSelector } from "redux/order/reducer";

const STRIPE_PUBLIC_KEY_LIVE =
  "pk_live_51IUQiOKQWovk2rIh0SfKkGNuHSE5J7VY6LCJaijjYh7lmjb64h8fmHcYmYoINNCNMTC5sxdsUkwnWIePd2z6vqPH00BzD2UrRm";
const STRIPE_PUBLIC_KEY_TEST =
  "pk_test_51IUQiOKQWovk2rIhec8u6qPLKq2TgWI9ZLLkC4jJGIfnV9RV3gi1I5Vk2wmZfRWGCIunxtJgRcBZC8wDBOIstdLL00zZVirE5R";

let Stripe;

const priceAlgorithm = getPriceAlgorithm();

export default function CheckoutPopupBody({
  isUploadPending,
  imageSavedResponse,
  imageBase64Created,
  backdropClose,
  percentageUpload,
  activeMapStyleName,
  fileSizeMB,
}) {
  const classes = useStyles();
  const product = useProductSelector();

  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });
  const [designDisplayed, setDesignDisplayed] = useState(false);

  const { dataPrintful } = useGetDataPrintful([product.variantId]);

  const IS_PRODUCTION = getIsProduction();
  const STRIPE_API_KEY = IS_PRODUCTION
    ? STRIPE_PUBLIC_KEY_LIVE
    : STRIPE_PUBLIC_KEY_TEST;

  useEffect(() => {
    const asyncStripeInit = async () => {
      Stripe = await StripePromise;
    };

    const StripePromise = loadStripe(STRIPE_API_KEY);

    asyncStripeInit();
  }, []);

  useEffect(() => {
    if (imageBase64Created) {
      setTimeout(() => {
        setLightbox({
          open: true,
          activeSrc: imageBase64Created,
        });
        setDesignDisplayed(true);
      }, 1000);
    }
  }, [imageBase64Created]);

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    product.variantId,
    dataPrintful
  );

  async function redirectToCheckout() {
    const response = await axios.post("api/stripe-checkout", {
      product,
      imageObj: imageSavedResponse,
      checkoutShownPrices: {
        netPriceWithDelivery: priceWithDelivery.netPrice,
      },
    });

    if (response?.data?.error) {
      toast.error(
        "Error: Odlišné ceny, kontaktujte prosím technickou podporu",
        {
          position: "top-left",
        }
      );
    } else if (response?.data?.id) {
      Stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
    } else {
      toast("Info: Něco se pokazilo, kontaktujte prosím technickou podporu", {
        position: "top-left",
      });
    }
  }

  const ImageUploaded = () => (
    <>
      {!imageBase64Created ? (
        <CustomLoaderWrap>
          <StyledCircularProgress />
        </CustomLoaderWrap>
      ) : (
        <TeaserWrap>
          <StyledOpenInNewIcon />
          <StyledImg
            id="img_screen_shot"
            sx={styles.teaserFinalImage}
            src={imageBase64Created} //imageBase64Created
            onClick={(e) => {
              setLightbox({
                open: true,
                activeSrc: imageBase64Created,
              });
              e.stopPropagation();
            }}
          />
        </TeaserWrap>
      )}
    </>
  );

  return (
    <Card
      className={classes.paper}
      elevation={3}
      onClick={(e) => e.stopPropagation()}
    >
      <div sx={styles.heading_container}>
        <StyledCloseIcon onClick={() => backdropClose()} />

        <HeaderTextsContainer>
          <p sx={styles.uploading_counter}>
            {`${
              imageBase64Created ? "Design vytvořen ✅" : "Zpracovávám design"
            }`}
            {!imageBase64Created && (
              <WrapSpan>
                <UnderlineLoader />
              </WrapSpan>
            )}
          </p>

          <p sx={styles.uploading_counter}>
            {`${
              imageBase64Created && designDisplayed
                ? "Design zobrazen ✅"
                : "Zobrazuji design"
            }`}
            {imageBase64Created && !designDisplayed && (
              <WrapSpan>
                <UnderlineLoader />
              </WrapSpan>
            )}
          </p>
          <p sx={styles.uploading_counter}>
            {imageBase64Created
              ? `${isUploadPending ? "Ukládám" : "Uloženo"}`
              : "ukládání"}
            {imageBase64Created &&
              ` ${percentageUpload}% / ${fileSizeMB && fileSizeMB + "MB"} ${
                imageBase64Created && !isUploadPending ? "✅" : ""
              }`}
            {imageBase64Created && isUploadPending && (
              <WrapSpan>
                <UnderlineLoader />
              </WrapSpan>
            )}
          </p>
        </HeaderTextsContainer>
      </div>
      <CheckoutItems
        dataPrintful={dataPrintful}
        ImageComponent={<ImageUploaded />}
        activeMapStyleName={activeMapStyleName}
      />

      <NextTabContainer>
        <NextTabBtn
          width="100%"
          onClick={() => redirectToCheckout()}
          isLoadingOnClick
          isDisabled={isUploadPending}
        >
          Adresa doručení & platba
        </NextTabBtn>
      </NextTabContainer>
      {lightbox.open && (
        <Lightbox
          mainSrc={lightbox.activeSrc}
          onCloseRequest={() => setLightbox({ open: false })}
        />
      )}
    </Card>
  );
}

const StyledImg = styled.img`
  z-index: 10;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.56);
  width: 80px;
  height: 80px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  padding: 0.1rem;
  color: ${color("primary")};
  background-color: ${color("whitish_paper_blue")};
  border-radius: 5px;
  cursor: pointer;
`;

const NextTabContainer = styled.div`
  position: sticky;
  bottom: -1;
  width: 100%;
  padding: 15px 15px;
`;

const CustomLoaderWrap = styled.div`
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledCircularProgress = styled(CircularProgress)`
  height: 40px !important;
  width: 40px !important;
  color: ${color("cta_color")} !important;
`;

const WrapSpan = styled.span`
  color: ${color("cta_color")} !important;
`;

const TeaserWrap = styled.div`
  transform: translateX(0);
  color: ${color("whitish_paper_blue")};
  display: flex;
`;

const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 2px;
  cursor: pointer;
  z-index: 11;
  pointer-events: none;
`;

const HeaderTextsContainer = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const styles = {
  heading_container: {
    position: "sticky",
    top: 0,
    width: "100%",
    textAlign: "right",
    color: "white",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: "primary", // "text_secondary",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
    alignItems: "flex-start",
    padding: "15px 15px",
  },
  uploading_counter: {
    // textTransform: "uppercase",
    color: "white",
    fontWeight: "100",
    letterSpacing: "1.2px",
    fontSize: "14px",
    transform: "translateX(0)",
    display: "inline-block",
    lineHeight: "145%",
  },
  uploading_description: {
    textAlign: "left",
    fontSize: "0.8rem",
  },
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 10,
    color: "#fff",
    position: "relative",
  },
  paper: {
    width: "400px",
    maxHeight: "85vh",
    overflow: "scroll",
    backgroundColor: "whitish_paper_blue",
    textTransform: "unset",
  },
}));
