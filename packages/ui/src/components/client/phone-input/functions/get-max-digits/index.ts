import {
  CountryCode,
  getCountryCallingCode,
  getExampleNumber,
  parsePhoneNumberWithError,
} from "libphonenumber-js";

export const getMaxDigits = (country: CountryCode): number => {
  try {
    const mobileExample = getExampleNumber(country, "MOBILE" as any);
    const fixedExample = getExampleNumber(country, "FIXED_LINE" as any);

    const lengths: number[] = [];

    if (mobileExample) {
      lengths.push(mobileExample.nationalNumber.length);
    }

    if (fixedExample) {
      lengths.push(fixedExample.nationalNumber.length);
    }

    if (lengths.length > 0) {
      const maxLength = Math.max(...lengths);
      return maxLength;
    }

    const callingCode = getCountryCallingCode(country);

    for (let testLength = 6; testLength <= 15; testLength++) {
      const testDigits = "2".repeat(testLength);
      const testNumber = `+${callingCode}${testDigits}`;

      try {
        const parsed = parsePhoneNumberWithError(testNumber);

        const nextTestDigits = "2".repeat(testLength + 1);
        const nextTestNumber = `+${callingCode}${nextTestDigits}`;

        try {
          const nextParsed = parsePhoneNumberWithError(nextTestNumber);
          if (!nextParsed?.isValid() && parsed?.isValid()) {
            return testLength;
          }
        } catch {
          if (parsed?.isValid()) {
            return testLength;
          }
        }
      } catch {
        continue;
      }
    }

    return 10;
  } catch (error) {
    console.warn("Error getting max digits for country:", country, error);
    return 10;
  }
};
