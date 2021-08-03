import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { VARIANTS_PRINTFUL } from "../constants/constants";

import {
  getLazyDownloader,
  resetPendingPromise,
} from "../LibGlobal/getLazyDownloader";

let cachedResponse = null;

const fetchDataPrintful = async (variantIdsArr) => {
  const resp = await axios.post(`api/data-printful`, { variantIdsArr });
  return resp;
};

export function useGetDataPrintful() {
  const [data, setData] = useState(null);

  const variantIdsArr = VARIANTS_PRINTFUL.map((variant) => variant.id);

  const getSetPrice = async () => {
    try {
      const lazyDownloadDataPrintfull = () => {
        return getLazyDownloader(
          () => cachedResponse,
          () => fetchDataPrintful(variantIdsArr)
        )();
      };
      const response = await lazyDownloadDataPrintfull();

      setData(response.data.finalResult);
    } catch (e) {
      console.log({ e });
    }
  };

  useEffect(() => {
    // if (!data) {
    //   getSetPrice();
    // }
    getSetPrice();
  }, [JSON.stringify(variantIdsArr)]);

  const data_memo = useMemo(() => {
    return data;
  }, [data]);

  return { dataPrintful: data_memo };
}
