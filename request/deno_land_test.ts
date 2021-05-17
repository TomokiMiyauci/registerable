// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { query } from "./deno_land.ts";
import { assertEquals } from "../dev_deps.ts";
Deno.test("query", async () => {
  assertEquals(await query("fonction"), ["deno.land", false]);
});
