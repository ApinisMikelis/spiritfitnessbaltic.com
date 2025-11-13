import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import { useState } from "react";
import { Button, Dialog, Popover } from "react-aria-components";

import { cn } from "../../../../lib/utils";
import { Search } from "../../../icons";
import { Typography } from "../../../server";
import { TextInput } from "../../text-input";
import { CountryFlag } from "../country-flag";
import { getMaxDigits } from "../functions";
import { NoResults } from "../no-results";

type Props = {
  isOpen: boolean;
  popoverWidth?: number;
  setIsOpen: (isOpen: boolean) => void;
  selectedCountry: string | null;
  setSelectedCountry: (country: CountryCode) => void;
  localDigits?: string;
  setLocalDigits: (digits: string) => void;
};

export const CountryPopover = ({
  isOpen,
  setIsOpen,
  localDigits,
  popoverWidth,
  setLocalDigits,
  selectedCountry,
  setSelectedCountry,
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const countries = getCountries();

  const filteredCountries = countries.filter((country) => {
    const countryName = new Intl.DisplayNames(["en"], { type: "region" }).of(
      country,
    );
    const callingCode = getCountryCallingCode(country);
    return (
      countryName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      callingCode.includes(searchQuery) ||
      country.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);

    if (localDigits) {
      const maxDigits = getMaxDigits(country);
      const truncatedNumber = localDigits.slice(0, maxDigits);
      setLocalDigits(truncatedNumber);
    }

    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className="bg-white border border-gray-200 z-50 rounded-1 popover"
      style={{ width: popoverWidth }}
      placement="bottom start"
      offset={12}
    >
      <Dialog className="outline-none p-1">
        <TextInput
          value={searchQuery}
          iconLeft={<Search />}
          className="pb-1"
          placeholder="Search countries..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ul className="max-h-60 overflow-y-auto">
          {filteredCountries.length === 0 ? (
            <NoResults />
          ) : (
            filteredCountries.map((country, index) => {
              const countryName = new Intl.DisplayNames(["en"], {
                type: "region",
              }).of(country);
              const isSelected = selectedCountry === country;

              return (
                <li key={index}>
                  <Button
                    onPress={() => handleCountrySelect(country)}
                    className={cn(
                      "px-4 py-[10px] flex w-full justify-between cursor-pointer rounded-1 items-center",
                      {
                        "bg-neutral-200": isSelected,
                        "hover:bg-neutral-100": !isSelected,
                      },
                    )}
                  >
                    <div className="flex gap-2 w-full text-primary-900 items-center text-left">
                      <CountryFlag country={country} />
                      <Typography className="flex-1" appearance="cap-base">
                        {countryName}
                      </Typography>
                    </div>
                    <Typography
                      appearance="p-reg-xs"
                      className="text-neutral-900"
                    >
                      +{getCountryCallingCode(country)}
                    </Typography>
                  </Button>
                </li>
              );
            })
          )}
        </ul>
      </Dialog>
    </Popover>
  );
};
