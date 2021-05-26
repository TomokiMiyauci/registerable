// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { ifElse } from "../deps.ts";
const loggerFactory = (verbose: boolean) =>
  ifElse(
    verbose,
    () => (...data: any[]) => console.log(...data),
    () => (..._: any[]) => {},
  );

const logTableFactory = (verbose: boolean) =>
  ifElse(
    verbose,
    () =>
      (tabularData?: any, properties?: string[] | undefined) =>
        console.table(tabularData, properties),
    () => (..._: any[]) => {},
  );

export { loggerFactory, logTableFactory };
