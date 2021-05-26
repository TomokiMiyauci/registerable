// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { summarize } from "./format/json.ts";
import { loggerFactory, logTableFactory } from "./log/log.ts";
import { LANGUAGES, QUERY_MAP, REGISTRIES } from "./constants/mod.ts";
import { entries, flattenDeep, ifElse, NN, uniq } from "./deps.ts";
import { client } from "./api/client.ts";

type Option = {
  verbose: boolean;
  json: boolean;
  registry: typeof REGISTRIES[number][];
  languages: typeof LANGUAGES;
};

type Mode = {
  mode: "server" | "universal";
};

export const defaultOption: Option & Mode = {
  mode: "server",
  verbose: false,
  json: true,
  registry: ["deno.land", "nest.land", "npm"],
  languages: ["typescript", "javascript"],
};

interface ApiResponse {
  result: Record<string, boolean>;
  error: Record<string, string>;
  hasError: boolean;
  errorRegistry: string[];
}

const query2Direct = async (
  queries: any[],
  name: string,
): Promise<ApiResponse> => {
  const resultAll = await Promise.all((queries as any[]).map((fn) => fn(name)));
  return summarize(resultAll);
};

const checkName = async (name: string, option?: Partial<Option & Mode>) => {
  const {
    mode = defaultOption.mode,
    verbose = defaultOption.verbose,
    json = defaultOption.json,
    registry = defaultOption.registry,
  } = option || defaultOption;

  const consoleLog = loggerFactory(verbose);
  const consoleTable = logTableFactory(verbose);
  consoleLog(`🔍️ Check module name: %c${name}\n`, "color: gold");
  const query = pickKeys(QUERY_MAP, registry).filter((fn) => NN(fn));

  const { result, error, hasError, errorRegistry } = await ifElse(
    mode === "server",
    async () => await query2Direct(query, name),
    async () => await client(name, option as Option),
  );

  consoleLog("%cResults:", "color: skyblue");
  if (json) {
    console.log({
      result,
      error,
      hasError,
      errorRegistry,
    });
  } else {
    const formattedResult = format(!json, "available", result);
    console.table(formattedResult);
    if (hasError) {
      consoleLog("\n%cErrors:", "color: orangered");
      consoleTable(format(!json, "message", error));
    }
  }

  consoleLog("\n✨ Checking is done.");
  return {
    name,
    result,
    error,
    hasError,
  };
};

const format = (
  verbose: boolean,
  nestKey: string,
  result: Record<string, unknown>,
): Record<string, unknown> =>
  ifElse(
    verbose,
    () =>
      entries(result).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: { [nestKey]: value } }),
        {},
      ),
    result,
  );

const pickKeys = <T, U>(map: Record<PropertyKey, T>, val: U[]): T[] =>
  uniq(flattenDeep(val.map((key) => map[key as any])));

export { checkName };
export type { ApiResponse, Option };
