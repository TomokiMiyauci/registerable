import { Registry } from "../types/mod.ts";
import { BASE_URL } from "./_constants.ts";

const stringify = (val: { name: string; registry: Registry[] }): string => {
  const url = new URL("check-name", BASE_URL);
  url.search = constructSearchParams(val).toString();

  return url.toString();
};

const constructSearchParams = (
  { name, registry }: { name: string; registry: Registry[] },
): URLSearchParams => {
  const urlSearchParams = new URLSearchParams({ name });
  registry.forEach((reg) => {
    urlSearchParams.append("registry", reg);
  });

  return urlSearchParams;
};

export { BASE_URL, constructSearchParams, stringify };
