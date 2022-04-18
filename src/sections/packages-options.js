/** @jsx jsx */
import { jsx, Container, Flex } from "theme-ui";
import PackageCard from "components/package-card";
import SectionHeader from "components/section-header";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";
import { useTranslation } from "Hooks/useTranslation";
import { useGetCurrency } from "Hooks/useGetCurrency";
import styled from "styled-components";

import PatternBG from "assets/patternBG.png";
import ProductFramedPNG from "assets/packages/static_san_francisco.png";
import ProductFramedWebp from "assets/packages/static_san_francisco.webp";
import ProductNoFramePNG from "assets/packages/static_iceland.png";
import ProductNoFrameWebp from "assets/packages/static_iceland.webp";

const packages = [
  {
    header: "variants.1.header",
    name: "variants.1.name",
    description: "variants.1.description",
    variantId: 9357,
    buttonText: "variants.1.buttonText",
    buttonUri: "/studio?id=486e6724-b48e-4170-a374-7f3ce843ccdd",
    imgPNG: ProductFramedPNG,
    imgWebp: ProductFramedWebp,
    points: [
      {
        icon: <IoIosCheckmarkCircle />,
        text: "variants.feature.1",
        isAvailable: true,
      },
      {
        icon: <IoIosCheckmarkCircle />,
        text: "variants.feature.2",
        isAvailable: true,
      },
      // {
      //   icon: <IoIosCheckmarkCircle />,
      //   text: "Total assessment corrections with free download access system",
      //   isAvailable: true,
      // },
      {
        icon: <IoIosCheckmarkCircle />,
        text: "variants.feature.3",
        isAvailable: true,
      },
      // {
      //   icon: <IoIosCheckmarkCircle />,
      //   text: "Download and print courses and exercises in PDF",
      //   isAvailable: true,
      // },
    ],
  },
  {
    name: "variants.2.name",
    description: "variants.2.description",
    buttonText: "variants.2.buttonText",
    buttonUri: "/studio?id=a2d50948-8979-42db-914b-c12b6a096926",
    variantId: 8948,
    imgPNG: ProductNoFramePNG,
    imgWebp: ProductNoFrameWebp,
    points: [
      {
        icon: <IoIosCheckmarkCircle />,
        text: "variants.feature.1",
        isAvailable: true,
      },
      {
        icon: <IoIosCheckmarkCircle />,
        text: "variants.feature.2",
        isAvailable: true,
      },
      {
        icon: <IoIosCheckmarkCircle />,
        text: "variants.feature.3",
        isAvailable: false,
      },
    ],
  },
];

export default function PackagesOptions() {
  const IdsArr = packages.map((item) => item.variantId);
  const t = useTranslation();
  const { dataPrintful } = useGetDataPrintful(IdsArr);
  const currency = useGetCurrency();

  console.log({ dataPrintful });

  return (
    <section id="packages" sx={styles.packages}>
      <Container>
        <SectionHeader
          title={t("packages.title")}
          slogan={t("packages.subtitle")}
          isWhite={true}
        />
        <Flex
          sx={{
            justifyContent: "center",
            flexWrap: ["wrap", null, null, "nowrap"],
          }}
        >
          {/* {dataPrintful ? ( */}
          {packages.map((packageData) => (
            <PackageCard
              data={packageData}
              key={t(packageData.name)}
              isLoadingPrices={!!dataPrintful}
              priceFresh={`${getFormattedPrice({
                amount:
                  dataPrintful?.[packageData.variantId]
                    ?.priceWithDeliveryAndProfit.netPrice ?? 0,
                currency: currency,
              })}`}
              deliveryPrice={t("packages.freeDelivery")}
            />
          ))}
          {/* ) : (
            <WhiteText>...loading packages</WhiteText>
          )} */}
        </Flex>
      </Container>
    </section>
  );
}

const styles = {
  packages: {
    backgroundColor: "primary",
    backgroundImage: `url(${PatternBG})`,
    backgroundRepeat: `no-repeat`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    py: [8, null, 9, null, null, 10],
    position: "relative",
    "&::before": {
      position: "absolute",
      content: '""',
      top: 0,
      right: 0,
      background:
        "linear-gradient(-45deg, rgba(42,72,125, 0.3) 25%, transparent 25%, transparent 50%, rgba(42,72,125, 0.3) 50%, rgba(42,72,125, 0.3) 75%, transparent 75%, transparent)",
      width: "100%",
      backgroundSize: "350px 350px",
      height: "100%",
      opacity: 0.3,
      zIndex: 0,
    },
  },
};

const WhiteText = styled.span`
  color: white;
`;
