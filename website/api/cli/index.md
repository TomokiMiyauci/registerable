# CLI

The Cli interface is common to `Deno` and `Node.js`.

```bash
@runtime <name> [Options]
```

`@runtime`: How to call it depends on the runtime. See [Deno](#deno) or [Node.js](#nodejs) sections.

`name`: Check module is registerable or not. `required`

`Options`:  
**All options are optional**

| flag               | desc                   | type      | default                           | choice                          |
| ------------------ | ---------------------- | --------- | --------------------------------- | ------------------------------- |
| `-r`, `--registry` | Query to registry      | `array`   | [`deno.land`, `nest.land`, `npm`] | `deno.land`, `nest.land`, `npm` |
| `-j`, `--json`     | Display to JSON format | `boolean` | `false`                           |
| `--verbose`        | Verbose mode           | `boolean` | `true`                            |
| `-h`, `--help`     | Show help              | `boolean` |                                   |                                 |
| `-v`, `--version`  | Show version number    |           |                                   |

## Deno

`@runtime`: `deno run --allow-net https://deno.land/x/registerable/cli.ts`

### Configuration

Required permissions:

- --allow-net

### Local

You can use it directly from the CLI by using `deno run`:

```bash
deno run --allow-net https://deno.land/x/registerable/cli.ts <name> [Options]
```

### Global

You can also install it globally using the following:

```bash
deno install --allow-net -n registerable https://deno.land/x/registerable/cli.ts
```

Then, the package is available to run:

```bash
registerable <name> [Options]
```

## Node.js

### Local

You can install locally.

```bash
yarn add -D registerable
or
npm i -D registerable
```

then,

```bash
yarn registerable <name> [Options]
or
npm run registerable <name> [Options]
```

### Global

You can also install it globally using the following:

```bash
yarn global add registerable

registerable <name> [Options]
```
