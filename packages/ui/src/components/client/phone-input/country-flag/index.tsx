export const CountryFlag = ({ country }: { country: string }) => {
  const flag = country
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

  return <span className="pointer-events-none">{flag}</span>;
};
