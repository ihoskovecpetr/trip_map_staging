/** @jsx jsx */
import { jsx, Container, Flex } from "theme-ui";
import PriceCard from "components/price-card";
import SectionHeader from "components/section-header";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import PatternBG from "assets/patternBG.png";
import Manhattan from "assets/packages/manhattan.png";
// import Amsterdam from "assets/packages/Amsterdam.png";
import SanFrancicso from "assets/packages/san_francisco.png";
import CapeTown from "assets/packages/cape_town.png";
import { useGetDataPrintful } from "../Hooks/useGetDataPrintful";

const packages = [
  {
    header: "Doporučujeme",
    name: "Zarámovaná varianta",
    description: "Skvělé jako hotový dárek, stačí rozbalit",
    priceWithUnit: "$79.99", //TODO add price
    variantId: 9357,
    buttonText: "Do STUDIA",
    img: Manhattan,
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
    priceWithUnit: "$29.99", //TODO add price
    variantId: 8948,
    img: SanFrancicso,
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
export default function PackagesOptions() {
  const IdsArr = packages.map((item) => item.variantId);

  const { data: dataPrintful } = useGetDataPrintful(IdsArr);

  return (
    <section id="pricing" sx={styles.pricing}>
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
              <PriceCard
                data={packageData}
                key={packageData.name}
                priceFresh={`${dataPrintful[packageData.variantId]?.currency} ${
                  dataPrintful[packageData.variantId]?.price
                }`}
                deliveryPrice={`${
                  dataPrintful[packageData.variantId]?.shipping.currency
                } ${dataPrintful[packageData.variantId]?.shipping.rate}`}
              />
            ))}
        </Flex>
      </Container>
    </section>
  );
}

const styles = {
  pricing: {
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
