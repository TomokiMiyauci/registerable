// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { query } from "./query.ts";

export * from "./constants/registry.ts";
const checkDenoLand = (val: string) => query(val);

export { checkDenoLand };
