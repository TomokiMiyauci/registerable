// Copyright 2021-present the Registerable authors. All rights reserved. MIT license.
import { isEqualNormalizedName, normalize } from "./_utils.ts";
import { assertEquals } from "../dev_deps.ts";

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

Deno.test("isEqualNormalizedName", () => {
  const table: [string, string, boolean][] = [
    ["", "", true],
    ["fonction", "fonction", true],
    ["name-able", "nameable", true],
    ["nameable", "nameable", true],
    ["name-able", "n-a-m-e-a-b-l-e", true],
    ["n.a.m-e..a-b-le", "na.m.e.a.ble", true],
    ["nameable", "nnamebale", false],
    ["n-a--m-e-a-b-l_e", "n-a-m_e._a.b.le", true],
  ];

  table.forEach(([name, packageName, expected]) => {
    assertEquals(
      isEqualNormalizedName(normalize(name))(packageName),
      expected,
      `isEqualNormalizedName(${name})(${packageName}) -> ${expected}`,
    );
  });
});
