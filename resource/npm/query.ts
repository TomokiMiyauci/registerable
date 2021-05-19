// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { NPM_BASE_URL } from "./constants/registry.ts";
import { has, ifElse, props, tryCatch } from "../../deps.ts";
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

const query = (search: string): Promise<boolean> | Error => {
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

export { query };
