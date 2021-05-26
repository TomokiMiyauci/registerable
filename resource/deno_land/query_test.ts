// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { simpleCompare } from "./query.ts";
import { assertEquals } from "../../dev_deps.ts";
Deno.test("simpleCompare", async () => {
  assertEquals(await simpleCompare("fonction"), false);
  assertEquals(
    await simpleCompare("fonctionxxxxxxxxxxxxxxxxxxxxxxxxxxxx"),
    true,
  );
});
