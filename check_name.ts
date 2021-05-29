// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { QUERY_MAP } from "./constants/mod.ts";
import { ifElse, NN } from "./deps.ts";
import { client } from "./api/client.ts";
import { mapper, query2Direct, uniqFlatten } from "./cli/_utils.ts";
import { Option, Registry } from "./types/mod.ts";
import { RegisterableResult } from "./types/mod.ts";

const defaultOption: Option = {
  mode: "server",
  registry: ["deno.land", "nest.land", "npm"],
};

const checkName = async <T extends Registry>(
  name: string,
  option?: Partial<Option<T>>,
): Promise<RegisterableResult<T>> => {
  const {
    mode = defaultOption.mode,
    registry = defaultOption.registry,
  } = option || defaultOption;

  const query = uniqFlatten(mapper(QUERY_MAP, registry)).filter((fn) => NN(fn));

  return await ifElse(
    mode === "server",
    async () => await query2Direct(query, name),
    async () => await client(name, option as any),
  );
};

export { checkName };
