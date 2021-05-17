// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { NPM_BASE_URL } from "../constants.ts";
import { has, ifElse, props } from "../deps.ts";
type Response = {
  name: string;
  "dist-tags": Record<string, string>;
  license: string;
  maintainers: [];
  readme: string;
  readmeFilename: string;
  time: Record<string, string>;
  versions: Record<string, string>;
  _attachments: {};
  _rev: string;
  _id: string;
} | { "error": "Not found" };

const query = async (search: string) => {
  const modulesUrl = new URL(search, NPM_BASE_URL);

  try {
    const response = await fetch(modulesUrl.toString());
    const result = await response.json() as Response;
    const isAvailable = ifElse(
      has("name", result),
      () => props("name", result) !== search,
      true,
    );

    return ["npm", isAvailable] as const;
  } catch {
    return ["npm", false] as const;
  }
};

export { query };
