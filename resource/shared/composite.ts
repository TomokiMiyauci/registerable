// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { gt, length, lt, pipe } from "../../deps.ts";

const gtLength = (val: number) =>
  pipe(length, (length: number) => gt(length, val));

const ltLength = (val: number) =>
  pipe(length, (length: number) => lt(length, val));

const includeFactory = (array: string[]) =>
  (val: string): boolean => array.includes(val);

export { gtLength, includeFactory, ltLength };
