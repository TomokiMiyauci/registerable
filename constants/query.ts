import { checkNestLand, NEST_LAND } from "../resource/nest_land/main.ts";
import { checkNpm, NPM } from "../resource/npm/main.ts";
import { checkDenoLand, DENO_LAND } from "../resource/deno_land/main.ts";

const QUERY_MAP = {
  [DENO_LAND]: checkDenoLand,
  [NEST_LAND]: checkNestLand,
  [NPM]: checkNpm,
};

export { QUERY_MAP };
