// Copyright 2021-present the Nameable authors. All rights reserved. MIT license.
import { simpleCompare } from "./deno_land.ts";
import { assertEquals } from "../dev_deps.ts";
Deno.test("simpleCompare", async () => {
  assertEquals(await simpleCompare("fonction"), false);
  assertEquals(
    await simpleCompare("fonctionxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
    true,
  );
});
