// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { QUERY_MAP } from "./constants/mod.ts";
import { ifElse, NN } from "./deps.ts";
import { client } from "./api/client.ts";
import { checkNameWithLog, pickKeys, query2Direct } from "./cli/mod.ts";
import { Option } from "./types/mod.ts";
import { cliDeno } from "./cli/deno.ts";

const defaultOption: Option = {
  mode: "server",
  registry: ["deno.land", "nest.land", "npm"],
  languages: ["typescript", "javascript"],
};

const checkName = async (name: string, option?: Partial<Option>) => {
  const {
    mode = defaultOption.mode,
    registry = defaultOption.registry,
  } = option || defaultOption;

  const query = pickKeys(QUERY_MAP, registry).filter((fn) => NN(fn));

  return await ifElse(
    mode === "server",
    async () => await query2Direct(query, name),
    async () => await client(name, option as any),
  );
};

if (import.meta.main) {
  const argv = cliDeno();
  checkNameWithLog(argv._[0], argv);
}

export { checkName, defaultOption };
