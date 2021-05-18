// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
// import { info } from "https://deno.land/std@0.96.0/log/mod.ts";
import { outputFormat, summarize } from "./format/json.ts";
import { loggerFactory } from "./log/log.ts";
import { RUNTIME_MAP } from "./constants/runtime.ts";
import { LANGUAGE_MAP, LANGUAGES } from "./constants/language.ts";
import { flattenDeep } from "./deps.ts";
import { duplicate } from "./utils/duplicate.ts";
import { QUERY_MAP } from "./constants/query.ts";
import { NN } from "./deps.ts";

type Option = {
  silent: boolean;
  json: boolean;
  registry: [];
  languages: typeof LANGUAGES;
};

const defaultOption: Option = {
  silent: false,
  json: false,
  registry: [],
  languages: ["typescript", "javascript"],
};

const checkName = async (
  name: string,
  option?: Partial<
    Option
  >,
) => {
  const {
    silent = defaultOption.silent,
    json = defaultOption.json,
    languages = defaultOption.languages,
  } = option ||
    defaultOption;

  const lang = pickKeys(LANGUAGE_MAP, languages);
  const registry = pickKeys(RUNTIME_MAP, lang);
  const query = pickKeys(QUERY_MAP, registry).filter((fn) => NN(fn));

  const logger = loggerFactory(silent);
  logger(`Check name: ${name}\n`);

  const resultAll = await Promise.all(
    (query as any[]).map((fn) => fn(name)),
  );
  const { result, errors, hasError } = summarize(resultAll);

  logger("Results:");

  logger(outputFormat(json, result));
  if (hasError) {
    console.log("\nErrors:");
    errors.forEach(([registry, message]) => {
      logger(`${registry}: `, message);
    });
  }
};

const pickKeys = <T, U>(map: Record<PropertyKey, T>, val: U[]): T[] =>
  duplicate(flattenDeep(val.map((key) => map[key as any])));

export { checkName };
