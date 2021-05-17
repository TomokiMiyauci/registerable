// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { DENO_LAND_BASE_URL } from "../constants.ts";
import { and, isBoolean, N, NN, or, props } from "../deps.ts";

type Response = {
  success: boolean;
  data: {
    name: string;
    description: string;
    star_count: number;
  };
};

const simpleCompare = async (search: string) => {
  const modulesUrl = new URL(search, DENO_LAND_BASE_URL);

  try {
    const res = await fetch(modulesUrl.toString());
    const { success, data } = await res.json() as Response;
    const isAvailable = or(N(success), () => props("name", data) !== search);
    return isAvailable;
  } catch (e) {
    return e as Error;
  }
};

const query = async (search: string) => {
  const result = await simpleCompare(search);
  if (
    or(and(isBoolean(result), () => NN(result)), () => result instanceof Error)
  ) {
    return ["deno.land", result] as const;
  }

  return ["deno.land", false] as const;
};

export { query, simpleCompare };
