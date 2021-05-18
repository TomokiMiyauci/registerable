import { DENO_LAND, NEST_LAND, NPM } from "./registry.ts";
import { query } from "../request/deno_land.ts";
import { query as queryNestLand } from "../request/nest_land.ts";
import { query as queryNpm } from "../request/npm.ts";

const QUERY_MAP = {
  [DENO_LAND]: query,
  [NEST_LAND]: queryNestLand,
  [NPM]: queryNpm,
};

export { QUERY_MAP };
