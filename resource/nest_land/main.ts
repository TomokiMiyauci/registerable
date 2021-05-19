// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
export * from "./constants/registry.ts";
import { query } from "./query.ts";

const checkNestLand = (val: string) => query(val);

export { checkNestLand };
