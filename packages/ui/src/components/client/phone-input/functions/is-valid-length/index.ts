import {
  CountryCode,
  getCountryCallingCode,
  parsePhoneNumberWithError,
} from "libphonenumber-js";
import { getMaxDigits } from "../get-max-digits";

export const isValidLength = (
  localDigits: string,
  selectedCountry: CountryCode,
) => {
  if (!localDigits) return true;

  const maxDigits = getMaxDigits(selectedCountry);

  if (localDigits.length === maxDigits) {
    try {
      const callingCode = getCountryCallingCode(selectedCountry);
      const fullNumber = `+${callingCode}${localDigits}`;
      const parsed = parsePhoneNumberWithError(fullNumber);
      return parsed?.isValid() || false;
    } catch {
      return false;
    }
  }

  return localDigits.length < maxDigits;
};
