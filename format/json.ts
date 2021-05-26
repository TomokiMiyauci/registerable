// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { entries, ifElse, isBoolean, isString, length, NN } from "../deps.ts";
const json = (val: (readonly ["deno.land", boolean])[]) =>
  val.reduce((acc, [registry, isAvailable]) => {
    return { ...acc, [registry]: isAvailable };
  }, {} as Record<"deno.land", boolean>);

const summarize = (val: (readonly [string, boolean | string])[]): {
  result: Record<string, boolean>;
  hasError: boolean;
  error: Record<string, string>;
  errorRegistry: string[];
} => {
  const errorsTuple = val.filter(([_, result]) => isString(result)) as [
    string,
    string,
  ][];
  const error = errorsTuple.reduce(
    (acc, [registry, msg]) => ({ ...acc, [registry]: msg }),
    {},
  );

  const errorRegistry = errorsTuple.map(([registry]) => registry);

  const result = val.map((
    [registry, result],
  ) => [registry, ifElse(isBoolean(result), result, false)]) as (readonly [
    "deno.land",
    boolean,
  ])[];

  return {
    result: json(result),
    hasError: NN(length(errorsTuple)),
    error,
    errorRegistry,
  };
};

const outputFormat = (isJSON: boolean, val: Record<PropertyKey, boolean>) =>
  ifElse(
    isJSON,
    val,
    () =>
      entries(val).reduce(
        (acc, [registry, result]) =>
          ifElse(NN(acc), () =>
            `${acc}
${registry}: ${result}`, `${registry}: ${result}`),
        "",
      ),
  );

export { json, outputFormat, summarize };
