// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { checkName } from "./mod.ts";
import {
  first,
  ifElse,
  isArray,
  isBoolean,
  isString,
  isUndefined,
  length,
  N,
  or,
} from "./deps.ts";
import { error, info } from "https://deno.land/std@0.96.0/log/mod.ts";
import { parse } from "https://deno.land/std@0.97.0/flags/mod.ts";
import {
  HELP_HINT,
  INVALID_ARGS_NUMBER,
  INVALID_JSON_ARGS,
  INVALID_LANGUAGE_ARGS,
  INVALID_LANGUAGE_MEMBERS,
  INVALID_SILENT_ARGS,
  USAGE,
  USAGE_HEADER,
} from "./constants/message.ts";
import { invalidLanguages, validateLanguage } from "./validate/language.ts";

const undefinedOrBoolean = (val: unknown) =>
  or(isUndefined(val), () => isBoolean(val));

const undefinedOrString = (val: unknown) =>
  or(isUndefined(val), () => isString(val));

const notUndefinedOrBoolean = (val: unknown) => N(undefinedOrBoolean(val));
const cli = () => {
  const { _, verbose, json, language } = parse(Deno.args, {
    "alias": {
      "v": "verbose",
      "l": "language",
      "j": "json",
    },
  });

  const name = first(_);
  const languages = ifElse(
    isArray(language),
    language,
    () => ifElse(isString(language), () => [language], []),
  );

  const table = [[() => length(_) !== 1, () => {
    error(INVALID_ARGS_NUMBER + "\n");
    console.log(USAGE_HEADER);
    info(USAGE);
    console.log("\n" + HELP_HINT);

    Deno.exit();
  }], [() => N(name), () => {
    error(INVALID_ARGS_NUMBER + "\n");
    console.log(USAGE_HEADER);
    info(USAGE);
    console.log("\n" + HELP_HINT);
    Deno.exit();
  }], [
    () => notUndefinedOrBoolean(verbose),
    () => {
      error(INVALID_SILENT_ARGS + "\n");
      console.log(USAGE_HEADER);
      info(USAGE);
      console.log("\n" + HELP_HINT);
      Deno.exit();
    },
  ], [
    () => notUndefinedOrBoolean(json),
    () => {
      error(INVALID_JSON_ARGS + "\n");
      console.log(USAGE_HEADER);
      info(USAGE);
      console.log("\n" + HELP_HINT);
      Deno.exit();
    },
  ], [
    () => N(or(undefinedOrString(language), () => isArray(language))),
    () => {
      error(INVALID_LANGUAGE_ARGS + "\n");
      console.log(USAGE_HEADER);
      info(USAGE);
      console.log("\n" + HELP_HINT);
      Deno.exit();
    },
  ], [
    () => N(validateLanguage(languages)),
    () => {
      const invalidLang = invalidLanguages(languages);
      error(`${INVALID_LANGUAGE_MEMBERS} ${invalidLang.join(" ")}
      `);
      console.log(USAGE_HEADER);
      info(USAGE);
      console.log("\n" + HELP_HINT);
      Deno.exit();
    },
  ]] as const;

  table.forEach(([fn, a]) => {
    if (fn()) {
      a();
    }
  });

  checkName(name as string, {
    verbose,
    json,
    languages: ifElse(N(length(languages)), undefined, languages),
  });
};

if (import.meta.main) {
  cli();
}
