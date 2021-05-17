// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { query } from "./request/deno_land.ts";
import { query as queryNestLand } from "./request/nest_land.ts";
import { query as queryNpm } from "./request/npm.ts";
// import { info } from "https://deno.land/std@0.96.0/log/mod.ts";
import { summarize } from "./format/json.ts";
import { loggerFactory } from "./log/log.ts";

type Option = {
  silent: boolean;
  json: boolean;
  registry: [];
};

const defaultOption: Option = {
  silent: false,
  json: true,
  registry: [],
};

const checkName = async (
  name: string,
  option?: Partial<
    Option
  >,
) => {
  const { silent = defaultOption.silent } = option || defaultOption;
  const logger = loggerFactory(silent);
  logger(`Check name: ${name}\n`);

  const resultAll = await Promise.all(
    ([query, queryNestLand, queryNpm] as any[]).map((fn) => fn(name)),
  );
  const { result } = summarize(resultAll);
  logger(result);
};

export { checkName };
