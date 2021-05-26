import { nodeResolve } from "@rollup/plugin-node-resolve";
import ts from "rollup-plugin-ts";
import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import shebang from "rollup-plugin-add-shebang";
import { main, module } from "./package.json";
import json from "@rollup/plugin-json";

const baseDir = resolve(__dirname);
const inputFilePath = resolve(baseDir, "mod.ts");
const banner =
  "/*! Copyright (c) 2021-present the Registerable authors. All rights reserved. MIT license. */";

const replaceOption = {
  ".ts": "",
  "https://deno.land/x/fonction@v1.8.0-beta.5/mod": "fonction",
  "https://deno.land/x/is_valid@v1.0.0-beta.2/mod": "@miyauci/is-valid",
  preventAssignment: true,
};

const external = ["cross-fetch", "@miyauci/is-valid", "fonction"];

const rollupPluginPreserveFetch = (preserve, target) => ({
  name: "preserve-fetch",
  transform(code, mod) {
    if (mod.includes("node_modules")) return;
    const formattedCode = code.includes(target) ? `${preserve}${code}` : code;
    return { code: formattedCode, map: null };
  },
});

const nodeFetch = `import fetch from 'cross-fetch'\n`;
const config = [
  {
    input: inputFilePath,
    plugins: [
      // rollupPluginPreserveFetch(nodeFetch, "fetch"),
      replace(replaceOption),
      ts({
        transpiler: "babel",
        browserslist: ["defaults", "node 6", "supports es6-module"],
        tsconfig: (resolvedConfig) => ({
          ...resolvedConfig,
          declaration: false,
        }),
      }),
      nodeResolve(),
      terser(),
    ],

    external,

    output: {
      file: main,
      format: "cjs",
      sourcemap: true,
      banner,
    },
  },
  {
    input: inputFilePath,
    plugins: [
      rollupPluginPreserveFetch(nodeFetch, "fetch"),
      replace(replaceOption),
      ts({
        transpiler: "babel",
      }),
      nodeResolve(),
      terser(),
    ],

    external,

    output: {
      file: module,
      format: "es",
      sourcemap: true,
      banner,
    },
  },
  {
    input: "node/cli.ts",
    external: [...external, "yargs"],

    plugins: [
      json(),
      rollupPluginPreserveFetch(nodeFetch, "fetch"),
      replace(replaceOption),
      ts({
        browserslist: false,
        tsconfig: (resolvedConfig) => ({
          ...resolvedConfig,
          declaration: false,
          declarationMap: false,
        }),
      }),
      nodeResolve(),
      terser(),
      shebang(),
    ],

    output: {
      file: "dist/cli.js",
      format: "cjs",
      sourcemap: true,
      banner,
    },
  },
];

export default config;
