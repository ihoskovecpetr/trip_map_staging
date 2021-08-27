/** @jsx jsx */
import { jsx, Container, Flex } from "theme-ui";
import PackageCard from "components/package-card";
import SectionHeader from "components/section-header";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import PatternBG from "assets/patternBG.png";
import { useGetDataPrintful } from "Hooks/useGetDataPrintful";
import { getPriceAlgorithm } from "LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { getFormattedPrice } from "LibGlobal/getFormattedPrice";

import ProductFramed from "assets/packages/SanFrancisco_black.png";
import ProductNoFrame from "assets/packages/Iceland_green.png";

const packages = [
  {
    header: "Doporučujeme",
    name: "Zarámovaná varianta",
    description: "Skvělé jako hotový dárek, stačí rozbalit",
    priceWithUnit: "$79.99", //TODO add price
    variantId: 9357,
    buttonText: "Do STUDIA",
    buttonUri: "/studio?id=f73c1dd9-c09c-43c7-a75d-bb2e5d8a3858",
    img: ProductFramed, //Manhattan,
    points: [
      {
        icon: <IoIosCheckmarkCircle />,
        text: "Dostupné všechny barevné varianty",
        isAvailable: true,
      },
      {
        icon: <IoIosCheckmarkCircle />,
        text: "Dostupná všechna grafická rozvržení",
        isAvailable: true,
      },
      // {
      //   icon: <IoIosCheckmarkCircle />,
      //   text: "Total assessment corrections with free download access system",
      //   isAvailable: true,
      // },
      {
        icon: <IoIosCheckmarkCircle />,
        text: "Zarámování",
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
    name: "Provedení bez rámu",
    description: "Pro vlastní zarámování či jako plakát na zeď",
    buttonText: "Do STUDIA",
    buttonUri: "/studio?id=b194cb86-50a4-4265-82fe-3d9d5b47866d",
    priceWithUnit: "$29.99", //TODO add price
    variantId: 8948,
    img: ProductNoFrame,
    points: [
      {
        icon: <IoIosCheckmarkCircle />,
        text: "Dostupné všechny barevné varianty",
        isAvailable: true,
      },
      {
        icon: <IoIosCheckmarkCircle />,
        text: "Dostupná všechny grafická rozvržení",
        isAvailable: true,
      },
      {
        icon: <IoIosCheckmarkCircle />,
        text: "Zarámování",
        isAvailable: false,
      },
    ],
  },
];

const priceAlgorithm = getPriceAlgorithm();

export default function PackagesOptions() {
  const IdsArr = packages.map((item) => item.variantId);

  const { dataPrintful } = useGetDataPrintful(IdsArr);

  return (
    <section id="packages" sx={styles.packages}>
      <Container>
        <SectionHeader
          title="Varianty provedení"
          slogan="Jaké jsou možnosti"
          isWhite={true}
        />
        <Flex
          sx={{
            justifyContent: "center",
            flexWrap: ["wrap", null, null, "nowrap"],
          }}
        >
          {dataPrintful &&
            packages.map((packageData) => (
              <PackageCard
                data={packageData}
                key={packageData.name}
                priceFresh={`${getFormattedPrice(
                  dataPrintful?.[packageData.variantId]
                    ?.priceWithDeliveryAndProfit.netPrice ?? 0
                )}`}
                deliveryPrice={`doprava zdarma`}
              />
            ))}
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
