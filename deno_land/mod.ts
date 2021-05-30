// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { query } from "./query.ts";
import { ifElse, isBoolean, validateDenoLand } from "../deps.ts";
import { DENO_LAND } from "./_constants.ts";
const checkDenoLand = (val: string) => {
  const [result, err] = validateDenoLand(val);

  return ifElse(
    result,
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
    [DENO_LAND, err] as const,
  );
};

export { checkDenoLand };
