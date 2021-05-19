// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { AnyFn, N } from "../../deps.ts";

const inversion = <T extends AnyFn>(fn: T) =>
  (...val: Parameters<T>) => !fn(...val);

export { inversion };
