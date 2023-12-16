import COUNTRIES from "./countries.json";
export const Country = {
  options: COUNTRIES.map((e) => ({
    value: e.countryCode,
    label: e.countryNameEn,
  })).sort((a, b) => String(a.label).localeCompare(b.label)),
};
