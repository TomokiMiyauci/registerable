// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { keys } from "../deps.ts";
import { NPM } from "../resource/npm/main.ts";
import { NEST_LAND } from "../resource/nest_land/main.ts";
import { DENO_LAND } from "../resource/deno_land/main.ts";
export const DENO = "deno";
export const NODE = "node";

export const RUNTIME_MAP = {
  [DENO]: [DENO_LAND, NEST_LAND] as const,
  [NODE]: [NPM] as const,
} as const;

export const RUNTIMES = keys(RUNTIME_MAP) as [typeof DENO, typeof NODE];
export type Runtime = typeof RUNTIMES[number];
