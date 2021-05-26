// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { assertEquals } from "../../dev_deps.ts";
import { normalize } from "./format.ts";

Deno.test("normalize", () => {
  const table: [string, string][] = [
    ["", ""],
    ["abc", "abc"],
    ["abc.123", "abc123"],
    ["abc123", "abc123"],
    ["abc.123", "abc123"],
    ["name-able", "nameable"],
    ["n-a-m-e-a-b-l-e", "nameable"],
    ["n-a.-m.-e.-a.-b.-l.-e", "nameable"],
    ["Name-able", "nameable"],
  ];

  table.forEach(([val, expected]) => {
    assertEquals(
      normalize(val),
      expected,
      `normalize(${val}) -> ${expected}`,
    );
  });
});