// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
export * from "./constants/registry.ts";
import { query } from "./query.ts";
import { NEST_LAND } from "./constants/registry.ts";
import { ifElse, isBoolean, isUndefined } from "../../deps.ts";

import { validateNestLand } from "./validate.ts";

const checkNestLand = (val: string) => {
  const msg = validateNestLand(val);

  return ifElse(
    isUndefined(msg),
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
    [NEST_LAND, msg as string] as const,
  );
};

export { checkNestLand };
