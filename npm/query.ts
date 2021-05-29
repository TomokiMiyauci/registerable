// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import {
  MONIKER_RULES_ERROR,
  NPM_BASE_URL,
  NPM_PACKAGE_LIST_BASE_URL,
} from "./_constants.ts";
import {
  and,
  has,
  ifElse,
  isArray,
  isBoolean,
  N,
  NN,
  props,
  tryCatch,
} from "../deps.ts";
type Response = {
  name: string;
  "dist-tags": Record<string, string>;
  license: string;
  maintainers: [];
  readme: string;
  readmeFilename: string;
  time: Record<string, string>;
  versions: Record<string, string>;
  _attachments: Record<string, string>;
  _rev: string;
  _id: string;
} | { "error": "Not found" };
import { isEqualNormalizedName, normalize } from "./_utils.ts";
const simpleQuery = (search: string): Promise<boolean> | Error => {
  const modulesUrl = new URL(search, NPM_BASE_URL);

  return tryCatch<Promise<boolean>, Error>(async () => {
    const response = await fetch(modulesUrl.toString());
    const result = await response.json() as Response;
    const isAvailable = ifElse(
      has("name", result),
      () => props("name", result) !== search,
      true,
    );

    return isAvailable;
  });
};

type ApiResponse = {
  since: number;
  packageNames: string[];
};

const getPackageList = () =>
  tryCatch<Promise<string[]>, Error>(async () => {
    const res = await fetch(
      NPM_PACKAGE_LIST_BASE_URL,
    );

    const { packageNames } = await res.json() as ApiResponse;
    return packageNames;
  });

const complexQuery = async (search: string): Promise<boolean | Error> => {
  const packages = await getPackageList();
  if (N(isArray(packages))) {
    return packages as Error;
  }

  const isEqualNormalized = isEqualNormalizedName(normalize(search));

  const matched = (packages as string[]).some((packageName) =>
    isEqualNormalized(packageName)
  );

  return ifElse(
    matched,
    Error(MONIKER_RULES_ERROR),
    true,
  );
};

const query = async (search: string): Promise<boolean | Error> => {
  const simpleQueryResult = await simpleQuery(search);
  if (N(and(isBoolean(simpleQueryResult), NN(simpleQueryResult)))) {
    return simpleQueryResult;
  }

  return complexQuery(search);
};

export { complexQuery, getPackageList, normalize, query, simpleQuery };
