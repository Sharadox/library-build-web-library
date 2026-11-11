# @sharadox/library-build-web-library

Builds a React component library for bundlers such as Next.js with one command, so no library needs its own build scripts:

1. **Clears** `distribution/`.
2. **Compiles TypeScript** with your `tsconfig.build.json`.
3. **Compiles Sass modules:** each `*.module.scss` becomes `*.module.css` next to the JavaScript, with `source/` on the Sass load path.
4. **Copies assets as they are:** CSS, Sass partials and tokens (so applications can `@use` them), fonts, images, JSON data, 3D models.
5. **Points the JavaScript at the compiled CSS:** `./index.module.scss` becomes `./index.module.css`, so applications need no Sass.

Unit, benchmark and end-to-end tests, `test-fixture/` folders and screenshot snapshots are never copied.

## Install

```sh
pnpm add -D typescript @sharadox/library-build-web-library
```

```jsonc
// package.json
{ "scripts": { "build": "library-build" } }
```

## API

| Import            | Export                                                        | Description                                                                               |
| ----------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| bin               | `library-build`                                               | Builds the library in the current folder                                                  |
| `…/library-build` | `buildLibrary({ root?, source?, output?, project?, print? })` | The same from code; defaults `.`, `source`, `distribution`, `tsconfig.build.json`, silent |
| `…/build-plan`    | `buildPlan(files)`, `COPIED_EXTENSIONS`                       | Which files are compiled and copied                                                       |
| `…/style-import`  | `rewriteStyleImports(code)`                                   | `.module.scss` → `.module.css` in import paths                                            |
| `…/list-file`     | `listFiles(folder)`                                           | Every file below a folder, relative and sorted                                            |

## Develop

Tests build a small fixture library (`source/library-build/test-fixture/`) for real. `pnpm verify` runs formatting, lint, type-check, tests with 100% coverage and the build. Branches follow `<feature>.development` → `development` → `index`, and releases are `v<version>` tags on `index`.

## Licence

Licença Sharadox de Código Aberto, versão 0.1.0. See [português](LICENCA.md) (the binding text) and the [English translation](LICENSE.md).
