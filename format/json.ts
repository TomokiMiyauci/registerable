import { ifElse, isBoolean, length, N } from "../deps.ts";
const json = (val: (readonly ["deno.land", boolean])[]) =>
  val.reduce((acc, [registry, isAvailable]) => {
    return { ...acc, [registry]: isAvailable };
  }, {} as Record<"deno.land", boolean>);

const summarize = (val: (readonly [string, boolean | Error])[]): {
  result: Record<string, boolean>;
  hasError: boolean;
  errors: [string, Error][];
} => {
  const errors = val.filter(([_, result]) =>
    N(isBoolean(result))
  ) as ([string, Error])[];

  const result = val.map((
    [registry, result],
  ) => [registry, ifElse(isBoolean(result), result, false)]) as (readonly [
    "deno.land",
    boolean,
  ])[];

  return {
    result: json(result),
    hasError: N(length(errors)),
    errors,
  };
};

export { json, summarize };
