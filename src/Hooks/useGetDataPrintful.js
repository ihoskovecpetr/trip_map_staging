import { useState, useEffect, useMemo } from "react";
import { VARIANTS_PRINTFUL } from "../constants/constants";
import { fetchDataPrintful } from "../LibGlobal/fetchDataPrintful";

import {
  getLazyDownloader,
  resetPendingPromise,
} from "../LibGlobal/getLazyDownloader";

let cachedResponse = null;

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
    // console.log(
    //   { keys: Object.keys(data), variantIdsArr },
    //   JSON.stringify(Object.keys(data)) == JSON.stringify(variantIdsArr),
    //   { idsAlreadyFetched: idsAlreadyFetched(variantIdsArr) }
    // );
    // if (!data) {
    //   getSetPrice();
    // }
    console.log("useGetDataPrintful_fetch_new_prices", variantIdsArr);
    getSetPrice();
  }, [JSON.stringify(variantIdsArr)]);

  const data_memo = useMemo(() => {
    return data;
  }, [data]);

  return { dataPrintful: data_memo };
}
