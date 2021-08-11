/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx } from "theme-ui";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import Lightbox from "react-image-lightbox";

import CloseIcon from "@material-ui/icons/Close";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import CircularProgress from "@material-ui/core/CircularProgress";

import { color, mobile, desktop } from "utils";
import { getIsProduction } from "LibGlobal/getIsProduction";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import CheckoutItems from "./CheckoutItems";
import NextTabBtn from "../NextTabBtn/NextTabBtn";
import ImageUploadSteps from "./ImageUploadSteps";

import { useProductSelector, useDiscountSelector } from "redux/order/reducer";

// EUR account
// const STRIPE_PUBLIC_KEY_LIVE =
//   "pk_live_51IUQiOKQWovk2rIh0SfKkGNuHSE5J7VY6LCJaijjYh7lmjb64h8fmHcYmYoINNCNMTC5sxdsUkwnWIePd2z6vqPH00BzD2UrRm";
// const STRIPE_PUBLIC_KEY_TEST =
//   "pk_test_51IUQiOKQWovk2rIhec8u6qPLKq2TgWI9ZLLkC4jJGIfnV9RV3gi1I5Vk2wmZfRWGCIunxtJgRcBZC8wDBOIstdLL00zZVirE5R";

const STRIPE_PUBLIC_KEY_LIVE =
  "pk_live_51JMXyHCVDm94CHWQ8qbje7TzCuvsKKEeqB8S0zwg8jQ8hWhU97jrGLCS5f0fP3Gn5OSu1SoVatJW3vd9mfHMtsek00RAujkQSI";
const STRIPE_PUBLIC_KEY_TEST =
  "pk_test_51JMXyHCVDm94CHWQtr4H5GJ4sdJA2II0YeMO6izSpDOKUpfXncH4Fo0kdSHK9tF2ul0xBfANUsAdxBtYlsgWPB9G004bXHb5YW";

let Stripe;

const priceAlgorithm = getPriceAlgorithm();

export default function CheckoutPopupBody({
  isUploadPending,
  imageSavedResponse,
  imageBase64Created,
  backdropClose,
  activeMapStyleName,
  fileSizeMB,
}) {
  const product = useProductSelector();
  const discount = useDiscountSelector();

  const [lightbox, setLightbox] = useState({
    open: false,
    activeSrc: null,
  });
  const [designDisplayed, setDesignDisplayed] = useState(false);

  console.log({ imageBase64Created });

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
        // setDesignDisplayed(true);
      }, 1000);
    }
  }, [imageBase64Created]);

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    product.variantId,
    dataPrintful
  );

  const priceWithDeliveryAndDiscount = priceAlgorithm.getPriceWithDeliveryDiscounted(
    product.variantId,
    dataPrintful
  );

  async function redirectToCheckout() {
    const response = await axios.post("api/stripe-checkout", {
      product,
      imageObj: imageSavedResponse,
      checkoutShownPrices: {
        netPriceWithDelivery: priceWithDeliveryAndDiscount.netPrice,
      },
      discountCode: discount.code,
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
    <ImageUploadedContainer>
      {!imageBase64Created ? (
        <CustomLoaderWrap>
          <StyledCircularProgress />
        </CustomLoaderWrap>
      ) : (
        <TeaserImageWrap>
          <StyledImg
            id="img_screen_shot"
            src={imageBase64Created} //imageBase64Created
            onClick={(e) => {
              setLightbox({
                open: true,
                activeSrc: imageBase64Created,
              });
              e.stopPropagation();
            }}
          />
          <IconContainer>
            <StyledOpenInNewIcon />
          </IconContainer>
        </TeaserImageWrap>
      )}
    </ImageUploadedContainer>
  );

  return (
    <Card onClick={(e) => e.stopPropagation()}>
      <HeadingContainer>
        <StyledCloseIcon onClick={() => backdropClose()} />
        <ImageStepsContainer>
          <ImageUploaded />

          <ImageUploadSteps
            isUploadPending={isUploadPending}
            imageBase64Created={imageBase64Created}
            fileSizeMB={fileSizeMB}
          />
        </ImageStepsContainer>
      </HeadingContainer>
      <CheckoutItems
        dataPrintful={dataPrintful}
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

const Card = styled.div`
  background: ${color("heading_secondary")};
  width: 400px;
  max-height: 85vh;
  overflow: scroll;
  text-transform: unset;
  border-radius: 5px;
`;

const HeadingContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color("cta_color")};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
`;

const StyledCloseIcon = styled(CloseIcon)`
  padding: 0.1rem;
  color: ${color("primary")};
  border-radius: 5px;
  border: 2px solid;
  cursor: pointer;
  margin-top: 15px;
  margin-left: 15px;

  ${mobile`
    position: absolute;
`}
`;

const ImageStepsContainer = styled.div`
  position: sticky;
  top: 0;
  // width: 100%;
  color: white;
  z-index: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px;

  ${mobile`
    flex-direction: column;
  `}
`;

const ImageUploadedContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  order: 0;
  height: 120px;
  margin-bottom: 0px;

  ${mobile`
    order: 1;
    margin-bottom: 10px;
    justify-content: center;
    height: 150px;

  `}
`;

const TeaserImageWrap = styled.div`
  color: ${color("whitish_paper_blue")};
  height: 120px;
  display: flex;
  align-items: flex-end;

  ${mobile`
    height: 150px;
  `};
`;

const IconContainer = styled.span`
  height: 0;
  width: 0;
  display: block;
  position: relative;
  top: -2em;
  left: -2em;
  z-index: 100;
`;

const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  pointer-events: none;
`;

const StyledImg = styled.img`
  z-index: 10;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.56);
  display: block;
  max-width: 100%;
  max-height: 120px;
  width: auto;
  height: auto;
  border-radius: 5px;

  ${mobile`
    max-height: 150px;
  `}
`;

const NextTabContainer = styled.div`
  position: sticky;
  bottom: -1;
  width: 100%;
  padding: 15px 15px;
  color: black;
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
  color: ${color("primary")} !important;
`;
