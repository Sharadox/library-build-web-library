import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { compile } from "sass";
import { buildPlan } from "@sharadox/library-build-web-library/build-plan";
import { listFiles } from "@sharadox/library-build-web-library/list-file";
import { rewriteStyleImports } from "@sharadox/library-build-web-library/style-import";
import type { LibraryBuildOptions } from "@sharadox/library-build-web-library/library-build/type";

const write = (path: string, contents: string) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, contents);
};

/**
 * Builds a library: clears the output, compiles TypeScript with the build project, compiles Sass modules to CSS
 * (with the source folder on the Sass load path), copies assets and points the JavaScript at the compiled CSS.
 *
 * @example
 * await buildLibrary({ print: console.log });
 */
export function buildLibrary({
  root = ".",
  source = "source",
  output = "distribution",
  project = "tsconfig.build.json",
  print = () => {},
}: LibraryBuildOptions = {}): void {
  const from = join(root, source);
  const to = join(root, output);
  rmSync(to, { recursive: true, force: true });
  const typeScript = createRequire(resolve(root, "package.json")).resolve("typescript/bin/tsc");
  execFileSync(process.execPath, [typeScript, "-p", join(root, project)], { stdio: "inherit" });
  const plan = buildPlan(listFiles(from));
  for (const file of plan.copy) {
    mkdirSync(dirname(join(to, file)), { recursive: true });
    copyFileSync(join(from, file), join(to, file));
  }
  for (const file of plan.compile) {
    const { css } = compile(join(from, file), { loadPaths: [from], style: "compressed" });
    write(join(to, file.replace(/\.module\.scss$/, ".module.css")), css);
  }
  let rewritten = 0;
  for (const file of listFiles(to)) {
    if (!file.endsWith(".js")) continue;
    const code = readFileSync(join(to, file), "utf8");
    const updated = rewriteStyleImports(code);
    if (updated !== code) {
      writeFileSync(join(to, file), updated);
      rewritten++;
    }
  }
  print(
    `built: ${plan.compile.length} styles compiled, ${plan.copy.length} files copied, ${rewritten} imports rewritten`,
  );
}
