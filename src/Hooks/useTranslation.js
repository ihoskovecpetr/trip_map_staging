import React from "react";
import { useIntl } from "react-intl";

export function useTranslation() {
  const { formatMessage } = useIntl();
  const t = (id, values) => {
    if (!id) {
      return "";
    }
    return formatMessage({ id }, { ...values });
  };

  return t;
}
