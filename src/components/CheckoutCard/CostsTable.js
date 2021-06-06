/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { getPriceAlgorithm } from "../../LibGlobal/priceAlgorithm/getPriceAlgorithm";
import { getFormattedPrice } from "../../LibGlobal/getFormattedPrice";

export default function CostsTable({
  product,
  dataPrintful,
  dataPrintfulVariant,
}) {
  const priceAlgorithm = getPriceAlgorithm();

  const priceWithoutDelivery = priceAlgorithm.getPriceWithoutDelivery(
    product.variantId,
    dataPrintful
  );

  const priceOfDelivery = priceAlgorithm.getPriceOfDelivery(
    product.variantId,
    dataPrintful
  );

  const priceWithDelivery = priceAlgorithm.getPriceWithDelivery(
    product.variantId,
    dataPrintful
  );
  return (
    <>
      <div sx={styles.costsWrap}>
        <CostItem name="ZHOTOVENÍ" price={priceWithoutDelivery.netPrice} />

        <CostItem name="DORUČENÍ" price={priceOfDelivery.netPrice} />
      </div>
      <CostItem
        name="CELKEM"
        price={priceWithDelivery.netPrice} //TODO add price algorithm big.js
        isLargePrice
      />
    </>
  );
}

function CostItem({ name, price, isLargePrice }) {
  return (
    <div sx={styles.itemWrap}>
      <p>
        <StyedDescSpan>{name}</StyedDescSpan>
      </p>

      <p sx={styles.itemCost}>
        <StyledPriceSpan isLargePrice={isLargePrice}>
          {price ? getFormattedPrice(price) : "ZJIŠTUJI..."}
        </StyledPriceSpan>
      </p>
    </div>
  );
}

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const StyedDescSpan = styled.span`
  font-size: 0.6rem;
  font-weight: 600;
  color: grey;
  vertical-align: middle;
`;

const StyledPriceSpan = styled.span`
  vertical-align: middle;
  font-size: ${({ isLargePrice }) => (isLargePrice ? "1rem" : "0.8rem")};
  font-weight: 600;
`;

const styles = {
  itemWrap: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    "&:first-child": {},
    "&:last-child": {
      color: "primary",
    },
  },
  costsWrap: {
    borderBottom: "1px solid lightGrey",
    py: "5px",
  },
  itemCost: {
    color: "primary",
  },
};
