import { CountryCode } from "libphonenumber-js";
import { getMaxDigits } from "../get-max-digits";
import { isValidLength } from "../is-valid-length";

export const shouldShowError = (
  localDigits: string,
  selectedCountry: CountryCode,
) => {
  if (!localDigits) {
    return false;
  }

  const maxDigits = getMaxDigits(selectedCountry);

  if (localDigits.length === maxDigits) {
    return !isValidLength(localDigits, selectedCountry);
  }

  return false;
};
