import React from "react";
import { useRouter } from "next/router";
import { LANGUAGE_CURRENCY_TABLE } from "constants/constants";

export function useGetCurrency() {
  const { locale } = useRouter();

  return LANGUAGE_CURRENCY_TABLE[locale];
}
