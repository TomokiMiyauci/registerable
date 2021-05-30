// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { NPM, NPM_BASE_URL } from "../npm/_constants.ts";
import { DENO_LAND, DENO_LAND_BASE_URL } from "../deno_land/_constants.ts";
import { NEST_LAND, NEST_LAND_BASE_URL } from "../nest_land/_constants.ts";
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
