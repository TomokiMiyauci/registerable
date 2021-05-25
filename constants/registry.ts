// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { NPM, NPM_BASE_URL } from "../resource/npm/main.ts";
import { DENO_LAND, DENO_LAND_BASE_URL } from "../resource/deno_land/main.ts";
import { NEST_LAND, NEST_LAND_BASE_URL } from "../resource/nest_land/main.ts";
import { keys } from "../deps.ts";

export const REGISTRY_MAP = {
  [DENO_LAND]: DENO_LAND_BASE_URL,
  [NEST_LAND]: NEST_LAND_BASE_URL,
  [NPM]: NPM_BASE_URL,
} as const;

export const REGISTRIES = keys(REGISTRY_MAP) as [
  typeof DENO_LAND,
  typeof NEST_LAND,
  typeof NPM,
];
