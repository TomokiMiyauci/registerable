// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { query } from "./query.ts";
import { validateDenoLand } from "./validate.ts";
import { ifElse, isBoolean, isUndefined } from "../../deps.ts";
import { DENO_LAND } from "./constants/registry.ts";
export * from "./constants/registry.ts";
const checkDenoLand = (val: string) => {
  const msg = validateDenoLand(val);

  return ifElse(
    isUndefined(msg),
    async () => {
      const result = await query(val);
      return [
        DENO_LAND,
        ifElse(
          isBoolean(result),
          result as boolean,
          () => (result as Error).message,
        ),
      ] as const;
    },
    [DENO_LAND, msg as string] as const,
  );
};

export { checkDenoLand };
