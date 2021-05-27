import type { Option } from "../types/mod.ts";

type CommandLine = Omit<Option, "mode"> & {
  verbose: boolean;
  json: boolean;
};

const defaultOption: CommandLine = {
  verbose: false,
  json: true,
  registry: ["deno.land", "nest.land", "npm"],
  languages: ["typescript", "javascript"],
};

export { defaultOption };
export type { CommandLine };
