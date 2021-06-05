// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { RegisterableResult, Registry } from "../types/mod.ts";
import { summarize } from "../format/json.ts";
import { flattenDeep, pipe, uniq } from "../deps.ts";

const server = async <T extends Registry>(
  queries: any[],
  name: string,
): Promise<RegisterableResult<T>> => {
  const resultAll = await Promise.all((queries as any[]).map((fn) => fn(name)));
  return { ...summarize(resultAll), name };
};

const uniqFlatten = pipe(flattenDeep, uniq);

const mapper = <T, U>(map: Record<PropertyKey, T>, val: U[]): T[] =>
  val.map((key) => map[key as any]);

export { mapper, server, uniqFlatten };
