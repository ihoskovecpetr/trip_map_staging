import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import { VARIANTS_PRINTFUL } from "constants/constants";

import { getLazyDownloader } from "LibGlobal/getLazyDownloader";
import { getCurrencyFromLocale } from "LibGlobal/getCurrencyFromLocale";

let cachedResponse = {};

const fetchDataPrintful = async (variantIdsArr, currency) => {
  const resp = await axios.post(`api/data-printful`, {
    variantIdsArr,
    currency,
  });

  return resp;
};

export function useGetDataPrintful() {
  const [data, setData] = useState(null);
  const { locale } = useRouter();

  const variantIdsArr = VARIANTS_PRINTFUL.map((variant) => variant.id);

  const getSetPrice = async () => {
    try {
      const lazyDownloadDataPrintfull = () => {
        return getLazyDownloader(
          () => cachedResponse[locale],
          () => fetchDataPrintful(variantIdsArr, getCurrencyFromLocale(locale)),
          getCurrencyFromLocale(locale)
        )();
      };
      const response = await lazyDownloadDataPrintfull();

      cachedResponse = { [locale]: response, ...cachedResponse };

      setData(response.data.finalResult);
    } catch (e) {
      console.log({ getSetPrice_error: e });
    }
  };

  useEffect(() => {
    console.log({ new_locale: locale });
    setData(null);
    getSetPrice();
  }, [JSON.stringify(variantIdsArr), locale]);

  const data_memo = useMemo(() => {
    return data;
  }, [data]);

  return { dataPrintful: data_memo };
}
