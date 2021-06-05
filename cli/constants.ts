import type { Option } from "../types/mod.ts";

type CommandLine = Omit<Option, "mode" | "signal"> & {
  verbose: boolean;
  json: boolean;
};

const defaultOption: CommandLine = {
  verbose: false,
  json: true,
  registry: ["deno.land", "nest.land", "npm"],
};

export { defaultOption };
export type { CommandLine };
