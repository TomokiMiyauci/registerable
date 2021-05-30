import { copy, walk } from "https://deno.land/std@0.97.0/fs/mod.ts";
import { endsWith } from "../dev_deps.ts";

const rewriteMod = (content: string): string =>
  content.replace('import { cliDeno } from "./cli/deno.ts";', "").replace(
    'import { checkNameWithLog } from "./cli/mod.ts";',
    "",
  ).replace(
    `if (import.meta.main) {
  const argv = cliDeno();
  checkNameWithLog(argv._[0], argv);
}`,
    "",
  ).replace("checkNameWithLog,", "");

const TMP_DIR = "tmp";

Deno.mkdirSync(TMP_DIR, {
  recursive: true,
});

const dirs = [
  "api",
  "npm",
  "deno_land",
  "nest_land",
  "cli",
  "constants",
  "format",
  "log",
  "types",
  "validate",
];

await Promise.all(dirs.map(async (dir) => {
  await copy(dir, `${TMP_DIR}/${dir}`, {
    overwrite: true,
  });
}));

const mains = ["deps.ts", "mod.ts", "registerable.ts", "package.json"];

await Promise.all(mains.map(async (main) => {
  await copy(main, `${TMP_DIR}/${main}`, {
    overwrite: true,
  });
}));

for await (const entry of walk("tmp")) {
  if (entry.isFile && endsWith(".ts", entry.name)) {
    const content = Deno.readTextFileSync(entry.path);
    const formatted = entry.path === `${TMP_DIR}/mod.ts`
      ? rewriteMod(content)
      : content;

    const file = formatted.replace(/\.ts";/g, '";');

    Deno.writeTextFileSync(entry.path, file);
  }
}
