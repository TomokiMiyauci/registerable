// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { REGISTRIES } from "../constants/registry.ts";

type Registry = typeof REGISTRIES[number];

interface RegisterableResult<T extends Registry = Registry> {
  name: string;
  result: Record<T, boolean>;
  error: {
    [k in T]?: string;
  };
  hasError: boolean;
  errorRegistry: T[];
}

type Option<T extends Registry = Registry> = {
  registry: T[];
  mode: "server" | "universal";
  signal?: RequestInit["signal"];
};

export type { Option, RegisterableResult, Registry };
