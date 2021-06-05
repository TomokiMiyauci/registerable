// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { loggerFactory, logTableFactory } from "../log/log.ts";
import { QUERY_MAP } from "../constants/mod.ts";
import { entries, ifElse, NN } from "../deps.ts";
import { CommandLine, defaultOption } from "./constants.ts";
import { mapper, server, uniqFlatten } from "./_utils.ts";

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

  const query = uniqFlatten(mapper(QUERY_MAP, registry)).filter((fn) => NN(fn));

  const { result, error, hasError, errorRegistry } = await server(
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

export { checkNameWithLog, defaultOption };
