// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { DENO_LAND_BASE_URL } from "../constants.ts";
import { N, or, props } from "../deps.ts";

type Response = {
  success: boolean;
  data: {
    name: string;
    description: string;
    star_count: number;
  };
};

const query = async (search: string) => {
  const modulesUrl = new URL(search, DENO_LAND_BASE_URL);

  try {
    const res = await fetch(modulesUrl.toString());
    const { success, data } = await res.json() as Response;
    const isAvailable = or(N(success), () => props("name", data) !== search);
    return ["deno.land", isAvailable] as const;
  } catch {
    throw Error("Error:");
  }
};

export { query };
