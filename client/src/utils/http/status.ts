import { i18n } from "@/lang";
const t = i18n.global.t;
const statusType: any = {
  400: t("requestError"),
  401: t("unauthorized"),
  403: t("accessDenied"),
  404: t("requestError1"),
  408: t("requestTimeout"),
  500: t("serverError"),
  501: t("serverNotRealize"),
  502: t("networkError"),
  503: t("serverUnavailable"),
  504: t("networkTimeout"),
  505: t("versionNonsupport"),
};
export const showMessage = (status: number | string = ""): string => {
  let message =
    t("connectionError") + (statusType[+status] || t("checkNetwork"));
  return message;
};
