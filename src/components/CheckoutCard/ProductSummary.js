/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "theme-ui";
import styled from "styled-components";

import CostsTable from "./CostsTable";
import { getVersionDescription } from "../../LibGlobal/getVersionDescription";

export default function ProductSummary({ product, mapTitles, dataPrintful }) {
  const productDescription = getVersionDescription(product.variantId);
  const dataPrintfulVariant = dataPrintful && dataPrintful[product.variantId];

  return (
    <div sx={styles.productLine}>
      <div sx={styles.leftColumn}>
        <CostsTable product={product} dataPrintful={dataPrintful} />
        <NewLine />
        <ProductDetailItem name="PRODUKT" description={product.name} />
        <ProductDetailItem
          name="ROZMĚRY"
          description={product.sizeObject.name}
        />

        <ProductDetailItem
          name="doba doručení"
          description={`${dataPrintfulVariant?.shipping.minDeliveryDays} - ${dataPrintfulVariant?.shipping.maxDeliveryDays} dní`}
          isDataLoading={dataPrintfulVariant ? false : true}
        />

        <ProductDetailItem name="MATERIÁL" description={product.materialDesc} />
        <ProductDetailItem name="rámování" description={productDescription} />
        <ProductDetailItem
          name="nadpis"
          description={mapTitles?.heading.text}
        />
        <ProductDetailItem
          name="podnadpis"
          description={mapTitles?.subtitle.text}
        />
      </div>
    </div>
  );
}

function ProductDetailItem({ name, description, isDataLoading }) {
  return (
    <DetailItemWrap>
      <ItemName>{name}</ItemName>
      <div sx={styles.itemText}>
        {isDataLoading ? "ZJIŠTUJI..." : description}
      </div>
    </DetailItemWrap>
  );
}

const DetailItemWrap = styled.div`
  text-align: left;
  width: 100%;
  margin-top: 0.2rem;
`;

const ItemName = styled.p`
  font-size: 0.8rem;
  font-weight: 400;
  color: grey;
  text-transform: uppercase;
`;

const ItemDescription = styled.p`
  font-weight: 400;
  color: "#1F3E76";
`;

const NewLine = styled.div`
  height: 0.6rem;
  width: 100%;
`;
const styles = {
  productLine: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  leftColumn: {
    width: "100%",
  },
  costsWrap: {
    borderTop: "1px solid lightGrey",
    borderBottom: "1px solid lightGrey",
    py: "5px",
  },
  itemText: {
    color: "primary",
  },
};
