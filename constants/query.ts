import { checkNestLand } from "../nest_land/mod.ts";
import { checkNpm } from "../npm/mod.ts";
import { NPM } from "../npm/_constants.ts";
import { checkDenoLand } from "../deno_land/mod.ts";
import { DENO_LAND } from "../deno_land/_constants.ts";
import { NEST_LAND } from "../nest_land/_constants.ts";

const QUERY_MAP = {
  [DENO_LAND]: checkDenoLand,
  [NEST_LAND]: checkNestLand,
  [NPM]: checkNpm,
};

export { QUERY_MAP };
