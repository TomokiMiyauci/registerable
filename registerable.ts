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

/**
 * Ask if the name can be registered in the package registry.
 *
 * @param name - Query name
 * @param option - Query option
 * @returns Result of registerable or not
 *
 * @remark
 * Never throw an error
 *
 * @example
 * ```ts
 * // General usage
 * await registerable('fonction')
 * // {
 *      result: {
 *        "deno.land": false,
 *        "nest.land": false,
 *        npm: false,
 *      },
 *      hasError: false,
 *      error: {},
 *      errorRegistry: [],
 *      name: "fonction",
 *    };
 * ```
 *
 * @example
 * ```ts
 * // Filter query registry
 * await registerable('invalid-name', {
 *  registry: ['deno.land', 'npm']
 * })
 * // {
 *      result: {
 *        "deno.land": false,
 *        npm: false,
 *      },
 *      hasError: true,
 *      error: {
 *        "deno.land": "Name contains only the characters a-z, 0-9 and _"
 *      },
 *      errorRegistry: ["deno.land"],
 *      name: "invalid-name",
 *    };
 * ```
 */
const registerable = async <T extends Registry>(
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
    async () => await client(name, { registry }),
  );
};

export { registerable };
