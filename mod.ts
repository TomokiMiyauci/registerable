// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
// import { info } from "https://deno.land/std@0.96.0/log/mod.ts";
import { outputFormat, summarize } from "./format/json.ts";
import { loggerFactory } from "./log/log.ts";
import { RUNTIME_MAP } from "./constants/runtime.ts";
import { LANGUAGE_MAP, LANGUAGES } from "./constants/language.ts";
import { flattenDeep } from "./deps.ts";
import { duplicate } from "./utils/duplicate.ts";
import { QUERY_MAP } from "./constants/query.ts";
import { ifElse, NN } from "./deps.ts";
import { client } from "./api/client.ts";

type Option = {
  silent: boolean;
  json: boolean;
  registry: [];
  languages: typeof LANGUAGES;
};

type Mode = {
  mode: "server" | "universal";
};

const defaultOption: Option & Mode = {
  mode: "server",
  silent: false,
  json: false,
  registry: [],
  languages: ["typescript", "javascript"],
};

interface ApiResponse {
  result: Record<string, boolean>;
  errors: [string, string][];
  hasError: boolean;
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
    silent = defaultOption.silent,
    json = defaultOption.json,
    languages = defaultOption.languages,
  } = option || defaultOption;

  const lang = pickKeys(LANGUAGE_MAP, languages);
  const registry = pickKeys(RUNTIME_MAP, lang);
  const query = pickKeys(QUERY_MAP, registry).filter((fn) => NN(fn));

  const logger = loggerFactory(silent);
  logger(`Check name: ${name}\n`);

  const { result, errors, hasError } = await ifElse(
    mode === "server",
    async () => await query2Direct(query, name),
    async () => await client(name, option as Option),
  );

  logger("Results:");

  logger(outputFormat(json, result));
  if (hasError) {
    console.log("\nErrors:");
    errors.forEach(([registry, message]) => {
      logger(`${registry}: `, message);
    });
  }
  return {
    name,
    result,
    errors,
    hasError,
  };
};

const pickKeys = <T, U>(map: Record<PropertyKey, T>, val: U[]): T[] =>
  duplicate(flattenDeep(val.map((key) => map[key as any])));

export { checkName };
export type { ApiResponse, Option };
