import { toast } from "react-toastify";

export const REST_ERROR_DETAILS_STRING_FRAGMENT = "Szczegóły:";
export const REST_ERROR_STRING_FRAGMENT = "Błąd:";
export const TOAST_ERROR = "Wystąpił błąd.";

const splitDetailStartIndex = REST_ERROR_DETAILS_STRING_FRAGMENT.length;
const splitErrorStartIndex = REST_ERROR_STRING_FRAGMENT.length;

const removeDetailText = (text: string): string =>
  text.slice(splitDetailStartIndex).trim();
const removeErrorText = (text: string): string =>
  text.slice(splitErrorStartIndex).trim();

export const getErrorMessageText = (errorMessage: string): string => {
  const errorMessageRows = errorMessage?.split("\n");

  if (!errorMessageRows) {
    return TOAST_ERROR;
  }

  const errorMessageDetails = errorMessageRows?.filter(
    (text) =>
      text.includes(REST_ERROR_DETAILS_STRING_FRAGMENT) ||
      text.includes(REST_ERROR_STRING_FRAGMENT)
  );

  const isErrorMessageContainDetails =
    !!errorMessageDetails.length &&
    removeDetailText(errorMessageDetails[0]).length > 5;

  let allErrorMesssageDetails = "";

  errorMessageDetails.forEach((err) => {
    if (err.includes(REST_ERROR_DETAILS_STRING_FRAGMENT)) {
      allErrorMesssageDetails += `${removeDetailText(err)} `;
    }

    if (err.includes(REST_ERROR_STRING_FRAGMENT)) {
      allErrorMesssageDetails += `${removeErrorText(err)} `;
    }
  });

  const indexOfDetailText = errorMessage.indexOf(
    REST_ERROR_DETAILS_STRING_FRAGMENT
  );
  const correctLengthOfErrMessage =
    indexOfDetailText > 0 ? indexOfDetailText : errorMessage.length;
  const fullErrorMessage = errorMessage.substring(0, correctLengthOfErrMessage);

  return isErrorMessageContainDetails
    ? allErrorMesssageDetails.trimEnd()
    : fullErrorMessage;
};

export const displayErrorMessage = (error: any) => {
  const requestErrorMessage = getErrorMessageText(error.data?.message);

  toast.error(requestErrorMessage || TOAST_ERROR);
};
