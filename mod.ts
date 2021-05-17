// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { query } from "./request/deno_land.ts";
import { query as queryNestLand } from "./request/nest_land.ts";
import { query as queryNpm } from "./request/npm.ts";
// import { info } from "https://deno.land/std@0.96.0/log/mod.ts";
import { json } from "./format/json.ts";

const run = async (name: string) => {
  console.log(`Check name: ${name}\n`);
  const result = await Promise.all(
    ([query, queryNestLand, queryNpm] as any[]).map((fn) => fn(name)),
  );
  console.log(json(result as any));
};

export { run };
