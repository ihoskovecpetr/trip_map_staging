/** @jsx jsx */
import React, { useState, useEffect } from "react";
import { jsx, Text } from "theme-ui";
import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import { toast } from "react-toastify";

import Lightbox from "react-image-lightbox";
import { makeStyles } from "@material-ui/core/styles";
import CustomLoader from "../CustomLoader";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import NextTabBtn from "../NextTabBtn/NextTabBtn";
import ProductSummary from "./ProductSummary";

import { getIsProduction } from "../../Lib/getIsProduction";
import { useGetDataPrintful } from "../../Hooks/useGetDataPrintful";
import getPriceAlgorithm from "../../Lib/priceAlgorithm/getPriceAlgorithm";

const STRIPE_PUBLIC_KEY_LIVE =
      "pk_live_51IUQiOKQWovk2rIh0SfKkGNuHSE5J7VY6LCJaijjYh7lmjb64h8fmHcYmYoINNCNMTC5sxdsUkwnWIePd2z6vqPH00BzD2UrRm";
const STRIPE_PUBLIC_KEY_TEST =
      "pk_test_51IUQiOKQWovk2rIhec8u6qPLKq2TgWI9ZLLkC4jJGIfnV9RV3gi1I5Vk2wmZfRWGCIunxtJgRcBZC8wDBOIstdLL00zZVirE5R";

let Stripe;

const priceAlgorithm = getPriceAlgorithm();

export default function CheckoutCard({
      product,
      mapTitles,
      isUploadPending,
      setIsUploadPending,
      imageSavedResponse,
      imageBase64,
      backdropClose,
      percentageUpload,
}) {
      const classes = useStyles();
      const [lightbox, setLightbox] = useState({
            open: false,
            activeSrc: null,
      });

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

      async function redirectToCheckout() {
            const response = await axios.post("api/stripe-checkout", {
                  product,
                  imageObj: imageSavedResponse,
            });

            if (response?.data?.id) {
                  Stripe.redirectToCheckout({
                        sessionId: response.data.id,
                  });
            }
      }

      const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
            product,
            dataPrintful
      );

      return (
            <Card
                  className={classes.paper}
                  elevation={3}
                  onClick={(e) => e.stopPropagation()}
            >
                  <div sx={styles.topStickyContainer}>
                        <div sx={styles.teaserWrapper}>
                              <div sx={styles.white_padding}>
                                    {isUploadPending ? (
                                          // <CircularProgress style={{ color: "primary" }} />
                                          <>
                                                <CustomLoader />
                                          </>
                                    ) : (
                                          <img
                                                id="img_screen_shot"
                                                sx={styles.teaserFinalImage}
                                                src={imageBase64}
                                                onClick={(e) => {
                                                      setLightbox({
                                                            open: true,
                                                            activeSrc: imageBase64,
                                                      });
                                                      e.stopPropagation();
                                                }}
                                          />
                                    )}
                              </div>
                        </div>
                        <div sx={styles.picture_description}>
                              <p style={{ color: "white" }}>
                                    {" "}
                                    {percentageUpload} %
                              </p>
                              <p sx={styles.subName}>
                                    {isUploadPending
                                          ? "Ukládám design v tiskové kvalitě"
                                          : "Výsledný design pro tisk (bez rámování)"}
                              </p>
                        </div>
                        <div sx={styles.closeBackdrop}>
                              <p onClick={() => backdropClose()}>X</p>
                        </div>
                  </div>

                  <CardContent
                        className={classes.content}
                        classes={{
                              root: classes.contentRoot,
                        }}
                  >
                        <ProductSummary
                              product={product}
                              mapTitles={mapTitles}
                              dataPrintful={dataPrintful}
                        />
                  </CardContent>
                  <div sx={styles.bottomCtaContainer}>
                        <NextTabBtn
                              width="90%"
                              onClick={() => redirectToCheckout()}
                              isLoadingOnClick
                              isDisabled={isUploadPending}
                              disabledText={"Ukládám výsledný design"}
                              price={priceWithDelivery.netPrice}
                        >
                              Adresa doručení & platba
                        </NextTabBtn>
                  </div>
                  {lightbox.open && (
                        <Lightbox
                              mainSrc={lightbox.activeSrc}
                              onCloseRequest={() =>
                                    setLightbox({ open: false })
                              }
                        />
                  )}
            </Card>
      );
}

const styles = {
      topStickyContainer: {
            position: "sticky",
            top: 0,
            width: "100%",
            textAlign: "right",
            color: "white",
            zIndex: 10,
            display: "flex",
            width: "100%",
            backgroundColor: "primary", // "text_secondary",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: "20px",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            p: {
                  display: "inline-block",
                  px: "0.3rem",
                  borderBottomLeftRadius: "0.4rem",
                  cursor: "pointer",
            },
      },
      teaserWrapper: {
            // flexDirection: "column",
            display: "flex",
            justifyContent: "flex-start",
            p: "10px",
            height: "100px",
            //
      },
      white_padding: {
            backgroundColor: "whitish_paper_blue",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80px",
            width: "80px",
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px",
      },
      teaserFinalImage: {
            height: "80%",
            width: "80%",
            zIndex: 10,
            margin: "auto",
            cursor: "pointer",
            boxShadow: "0px 0px 3px rgba(0, 0, 0, 0.56)",
      },
      closeBackdrop: {
            position: "absolute",
            right: 0,
            top: 0,
            p: "0.3rem",
      },
      picture_description: {
            pb: "10px",
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
      },
      subName: {
            textAlign: "left",
            fontSize: "0.8rem",
      },
      productName: {
            fontWeight: 600,
      },
      productSize: {
            color: "grey",
      },
      productDesc: {
            color: "grey",
      },
      bottomCtaContainer: {
            position: "sticky",
            bottom: -1,
            width: "100%",
            py: "0.6rem",
      },
};

const useStyles = makeStyles((theme) => ({
      backdrop: {
            zIndex: 10,
            color: "#fff",
            position: "relative",
      },
      paper: {
            minWidth: "300px",
            maxHeight: "85vh",
            overflow: "scroll",
            backgroundColor: "whitish_paper_blue",
      },
      contentRoot: {
            paddingTop: "0",
      },
      content: {},
}));
