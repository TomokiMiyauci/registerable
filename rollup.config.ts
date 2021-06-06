import ts from "rollup-plugin-ts";
import { resolve } from "path";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import shebang from "rollup-plugin-add-shebang";
import { dependencies, main, module } from "./package.json";
import { keys } from "fonction";
import json from "@rollup/plugin-json";

const baseDir = resolve(__dirname);
const inputFilePath = resolve(baseDir, "tmp", "mod.ts");
const banner =
  "/*! Copyright (c) 2021-present the Registerable authors. All rights reserved. MIT license. */";

const replaceOption = {
  ".ts": "",
  "https://deno.land/x/fonction@v1.8.1/mod": "fonction",
  "https://deno.land/x/is_valid@v1.0.0-beta.9/mod": "@miyauci/is-valid",
  "https://deno.land/x/is_valid_package_name@v1.0.0/mod":
    "is-valid-package-name",
  preventAssignment: true,
};

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
      rollupPluginPreserveFetch(nodeFetch, "fetch"),
      replace(replaceOption),
      ts({
        transpiler: "babel",
        tsconfig: (resolvedConfig) => ({
          ...resolvedConfig,
          declaration: false,
        }),
      }),
      terser(),
    ],

    external: keys(dependencies),

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
      terser(),
    ],

    external: keys(dependencies),

    output: {
      file: module,
      format: "es",
      sourcemap: true,
      banner,
    },
  },
  {
    input: "tmp/cli/node.ts",

    external: [...keys(dependencies), "yargs/helpers"],

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
