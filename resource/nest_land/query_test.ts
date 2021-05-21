// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { query } from "./query.ts";
import { assertEquals } from "../../dev_deps.ts";
Deno.test("query", async () => {
  assertEquals(await query("fonction"), false);
  assertEquals(
    await query("fonctionxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
    true,
  );
});
