// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { complexQuery, getPackageList, query, simpleQuery } from "./query.ts";
import { assertEquals } from "../../dev_deps.ts";
import { isArray } from "../../deps.ts";
import { MONIKER_RULES_ERROR } from "./constants/message.ts";

Deno.test("simpleQuery", async () => {
  assertEquals(await simpleQuery("fonction"), false);
  assertEquals(await simpleQuery("nameable"), false);
  assertEquals(await simpleQuery("n-ameable"), true);
});

Deno.test("complexQuery", async () => {
  assertEquals(await complexQuery("n-ameable"), Error(MONIKER_RULES_ERROR));
  assertEquals(
    await complexQuery("n-a.m-e_a.b-l__e"),
    Error(MONIKER_RULES_ERROR),
  );
  assertEquals(
    await complexQuery("xxxxxxxxxxxxxxxyyyyyyyyyyyyyzzzzzzzzz"),
    true,
  );
});

Deno.test("query", async () => {
  assertEquals(await query("fonction"), false);
  assertEquals(await query("nameable"), false);
  assertEquals(await query("xxxxxxxxxxxxxxxyyyyyyyyyyyyyzzzzzzzzz"), true);
  assertEquals(await query("n-a.m-e_a.b-l__e"), Error(MONIKER_RULES_ERROR));
});

Deno.test("getPackageList", async () => {
  const packageList = await getPackageList();
  assertEquals(isArray(packageList), true);
});
