/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";
import { getPriceAlgorithm } from "../../LibGlobal/priceAlgorithm/getPriceAlgorithm";

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
        <CostItem
          name="ZHOTOVENÍ"
          price={priceWithoutDelivery.netPrice}
          currency={"CZK"}
        />

        <CostItem
          name="DORUČENÍ"
          price={priceOfDelivery.netPrice}
          currency={"CZK"}
          // isDataLoading={dataPrintfulVariant ? false : true}
        />
      </div>
      <CostItem
        name="CELKEM"
        price={priceWithDelivery.netPrice} //TODO add price algorithm big.js
        isDataLoading={priceWithDelivery ? false : true}
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
