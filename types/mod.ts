// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { LANGUAGES } from "../constants/language.ts";
import { REGISTRIES } from "../constants/registry.ts";

interface ApiResponse {
  name: string;
  result: Record<string, boolean>;
  error: Record<string, string>;
  hasError: boolean;
  errorRegistry: string[];
}

type Option = {
  registry: typeof REGISTRIES[number][];
  languages: typeof LANGUAGES;
  mode: "server" | "universal";
};

export type { ApiResponse, Option };
