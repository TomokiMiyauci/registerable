// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { DENO, NODE } from "./runtime.ts";
import { keys } from "../deps.ts";

export const TYPESCRIPT = "typescript";
export const JAVASCRIPT = "javascript";

export const LANGUAGE_MAP = {
  [TYPESCRIPT]: [DENO, NODE] as const,
  [JAVASCRIPT]: [DENO, NODE] as const,
} as const;

export const LANGUAGES = keys(LANGUAGE_MAP) as [
  typeof TYPESCRIPT,
  typeof JAVASCRIPT,
];

export type Language = typeof LANGUAGES[number];
