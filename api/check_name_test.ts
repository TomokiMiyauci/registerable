// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { assertEquals } from "../dev_deps.ts";

const BASE_URL = "https://registerable-os5ie232d-tomoki-miyauci.vercel.app/";
const ENTPOINT = new URL(
  "check-name",
  BASE_URL,
);
Deno.test("check-name#no name parameter query", async () => {
  const res = await fetch(
    ENTPOINT,
  );

  assertEquals(res.status, 403);
  assertEquals(res.ok, false);
  const result = await res.json();
  assertEquals(result, {
    error: "name parameter is necessary",
  });
});

Deno.test("check-name?name=fonction", async () => {
  const url = new URL(ENTPOINT.href);
  url.searchParams.append("name", "fonction");

  const res = await fetch(url);

  assertEquals(res.status, 200);
  assertEquals(res.ok, true);
  const result = await res.json();
  assertEquals(result, {
    error: {},
    errorRegistry: [],
    hasError: false,
    name: "fonction",
    result: {
      "deno.land": false,
      "nest.land": false,
      npm: false,
    },
  });
});

Deno.test("check-name#no name parameter query", async () => {
  const res = await fetch(
    ENTPOINT,
  );

  assertEquals(res.status, 403);
  assertEquals(res.ok, false);
  const result = await res.json();
  assertEquals(result, {
    error: "name parameter is necessary",
  });
});
