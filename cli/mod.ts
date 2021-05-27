// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { summarize } from "../format/json.ts";
import { loggerFactory, logTableFactory } from "../log/log.ts";
import { QUERY_MAP } from "../constants/mod.ts";
import { entries, flattenDeep, ifElse, NN, uniq } from "../deps.ts";
import { CommandLine, defaultOption } from "./constants.ts";
const query2Direct = async (
  queries: any[],
  name: string,
): Promise<any> => {
  const resultAll = await Promise.all((queries as any[]).map((fn) => fn(name)));
  return summarize(resultAll);
};

const checkNameWithLog = async (
  name: string,
  option?: Partial<CommandLine>,
): Promise<void> => {
  const {
    verbose = defaultOption.verbose,
    json = defaultOption.json,
    registry = defaultOption.registry,
  } = option || defaultOption;

  const consoleLog = loggerFactory(verbose);
  const consoleTable = logTableFactory(verbose);
  consoleLog(`🔍️ Check module name: %c${name}\n`, "color: gold");
  const query = pickKeys(QUERY_MAP, registry).filter((fn) => NN(fn));

  const { result, error, hasError, errorRegistry } = await query2Direct(
    query,
    name,
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
    const formattedResult = format(!json, "registerable", result);
    console.table(formattedResult);
    if (hasError) {
      consoleLog("\n%cErrors:", "color: orangered");
      consoleTable(format(!json, "message", error));
    }
  }

  consoleLog("\n✨ Checking is done.");
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

export { checkNameWithLog, defaultOption, pickKeys, query2Direct };
