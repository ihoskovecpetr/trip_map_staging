import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { VARIANTS_PRINTFUL } from "../constants/constants";

const getShippingCostByVariantId = (id) => {
  return VARIANTS_PRINTFUL.find((variant) => variant.id === id)?.shipping.price;
};

export function useGetShippingInfoPrintful(variantId) {
  const [isShippingInfoLoading, setIsShippingInfoLoading] = useState(false);
  const [shippingInfoObject, setShippingInfoObject] = useState(null);

  const getSetPrice = async () => {
    try {
      setIsShippingInfoLoading(true);
      setShippingInfoObject(null);

      const response = await axios.post(
        `api/shipping-info-printful?variantId=${variantId}`
      );

      setIsShippingInfoLoading(false);

      const responseObj = {
        ...response?.data?.result,
        rate: getShippingCostByVariantId(variantId),
      };

      setShippingInfoObject(responseObj);
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    getSetPrice();
  }, [JSON.stringify(variantId)]);

  const deliveryInfoObject_memo = useMemo(() => {
    return shippingInfoObject;
  }, [shippingInfoObject]);

  return { shippingInfoObject: deliveryInfoObject_memo, isShippingInfoLoading };
}
