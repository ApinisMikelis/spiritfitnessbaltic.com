import {
  AsYouType,
  CountryCode,
  getCountryCallingCode,
} from "libphonenumber-js";

export const getFormattedDisplay = (
  localDigits: string,
  selectedCountry: CountryCode,
) => {
  if (!localDigits) {
    return "";
  }

  try {
    const formatter = new AsYouType(selectedCountry);

    const callingCode = getCountryCallingCode(selectedCountry);
    const fullNumber = `+${callingCode}${localDigits}`;

    const formatted = formatter.input(fullNumber);

    const nationalPart = formatted.replace(`+${callingCode}`, "").trim();

    return nationalPart;
  } catch {
    return localDigits;
  }
};
