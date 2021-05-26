// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { DENO_LAND_BASE_URL } from "./constants/registry.ts";
import { N, or, props, tryCatch } from "../../deps.ts";

type Response = {
  success: boolean;
  data: {
    name: string;
    description: string;
    star_count: number;
  };
};

const simpleCompare = (search: string) => {
  const modulesUrl = new URL(search, DENO_LAND_BASE_URL);

  return tryCatch<Promise<boolean>, Error>(async () => {
    const res = await fetch(modulesUrl.toString());
    const { success, data } = await res.json() as Response;
    const isAvailable = or(N(success), () => props("name", data) !== search);
    return isAvailable;
  });
};

const query = (search: string): Promise<boolean> | Error =>
  simpleCompare(search);

export { query, simpleCompare };
