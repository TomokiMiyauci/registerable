// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { ifElse } from "../deps.ts";
const loggerFactory = (isSilent: boolean) =>
  ifElse(
    isSilent,
    () => (..._: any[]) => {},
    () => (...data: any[]) => console.log(...data),
  );

const logTableFactory = (verbose: boolean) =>
  ifElse(
    verbose,
    () => (..._: any[]) => {},
    () =>
      (tabularData?: any, properties?: string[] | undefined) =>
        console.table(tabularData, properties),
  );

export { loggerFactory, logTableFactory };
