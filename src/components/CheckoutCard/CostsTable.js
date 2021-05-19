/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";

export default function CostsTable({
  product,
  // shippingInfoObject,
  // isShippingInfoLoading,
  dataPrintfulVariant,
}) {
  return (
    <>
      <div sx={styles.costsWrap}>
        <CostItem
          name="ZHOTOVENÍ"
          price={dataPrintfulVariant?.price}
          currency={dataPrintfulVariant?.currency ?? ""}
        />

        <CostItem
          name="DORUČENÍ"
          price={dataPrintfulVariant?.shipping.rate}
          currency={dataPrintfulVariant?.shipping.currency}
          isDataLoading={dataPrintfulVariant ? false : true}
        />
      </div>
      <CostItem
        name="CELKEM"
        price={eval(
          `${dataPrintfulVariant?.price} + ${dataPrintfulVariant?.shipping.rate}`
        )} //TODO add price algorithm big.js
        isDataLoading={dataPrintfulVariant ? false : true}
        currency="CZK"
        isLargePrice
      />
    </>
  );
}

function CostItem({ name, price, currency, isLargePrice, isDataLoading }) {
  return (
    <ItemWrap>
      <CostNameP>{name}</CostNameP>
      <div sx={styles.itemText}>
        <CostP isLargePrice={isLargePrice}>
          {isDataLoading ? "ZJIŠTUJI..." : `${currency} ${price}`}
        </CostP>
      </div>
    </ItemWrap>
  );
}

const ItemWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const CostNameP = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: grey;
`;

const CostP = styled.p`
  font-size: ${({ isLargePrice }) => (isLargePrice ? "1rem" : "0.8rem")};
  font-weight: 600;
`;

const styles = {
  costsWrap: {
    borderBottom: "1px solid lightGrey",
    py: "5px",
  },
  itemText: {
    color: "primary",
  },
};
