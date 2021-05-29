// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { query } from "./query.ts";
import { NPM } from "./_constants.ts";
import { ifElse, isBoolean, validateNpm } from "../deps.ts";

const checkNpm = (val: string) => {
  const [result, err] = validateNpm(val);

  return ifElse(
    result,
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
    [NPM, err] as const,
  );
};

export { checkNpm };
