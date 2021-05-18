// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
export const DENO_LAND = "deno.land";
export const NEST_LAND = "next.land";
export const NPM = "npm";

export const DENO_LAND_BASE_URL = "https://api.deno.land/modules/";
export const NPM_BASE_URL = "https://registry.npmjs.org/";
export const NEST_LAND_BASE_URL = "https://nest.land/api/packages/";

export const REGISTRY_MAP = {
  [DENO_LAND]: DENO_LAND_BASE_URL,
  [NEST_LAND]: NEST_LAND_BASE_URL,
  [NPM]: NPM_BASE_URL,
} as const;
