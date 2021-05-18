// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { validateNpm } from "./validate.ts";
import { query } from "./query.ts";
import { NPM } from "./constants/registry.ts";
import { ifElse, isBoolean, isUndefined } from "../../deps.ts";
export * from "./constants/registry.ts";
const checkNpm = (val: string) => {
  const msg = validateNpm(val);

  return ifElse(
    isUndefined(msg),
    async () => {
      const result = await query(val);
      return [
        NPM,
        ifElse(
          isBoolean(result),
          result as boolean,
          () => (result as Error).message,
        ),
      ] as const;
    },
    [NPM, msg as string] as const,
  );
};

export { checkNpm };
