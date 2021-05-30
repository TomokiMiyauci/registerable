// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { query } from "./query.ts";
import { NEST_LAND } from "./_constants.ts";
import { ifElse, isBoolean, validateNestLand } from "../deps.ts";

const checkNestLand = (val: string) => {
  const [result, err] = validateNestLand(val);

  return ifElse(
    result,
    async () => {
      const result = await query(val);
      return [
        NEST_LAND,
        ifElse(
          isBoolean(result),
          result as boolean,
          () => (result as Error).message,
        ),
      ] as const;
    },
    [NEST_LAND, err] as const,
  );
};

export { checkNestLand };
