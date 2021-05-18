// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { ifElse } from "../deps.ts";
const loggerFactory = (isSilent: boolean) =>
  ifElse(
    isSilent,
    () => (..._: any[]) => {},
    () => (...message: any[]) => console.log(...message),
  );

export { loggerFactory };
