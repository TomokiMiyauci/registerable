// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { keys } from "../deps.ts";
import { NPM } from "../npm/_constants.ts";
import { NEST_LAND } from "../nest_land/_constants.ts";
import { DENO_LAND } from "../deno_land/_constants.ts";
export const DENO = "deno";
export const NODE = "node";

export const RUNTIME_MAP = {
  [DENO]: [DENO_LAND, NEST_LAND] as const,
  [NODE]: [NPM] as const,
} as const;

export const RUNTIMES = keys(RUNTIME_MAP) as [typeof DENO, typeof NODE];
export type Runtime = typeof RUNTIMES[number];
