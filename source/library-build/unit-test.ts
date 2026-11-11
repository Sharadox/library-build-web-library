import { cpSync, existsSync, mkdtempSync, readFileSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, test, vi } from "vitest";
import { buildLibrary } from "@sharadox/library-build-web-library/library-build";

const fixture = fileURLToPath(new URL("./test-fixture/library/", import.meta.url));
const modules = fileURLToPath(new URL("../../node_modules", import.meta.url));

/** A copy of the fixture library in a temporary folder, sharing this repository's node_modules. */
const copyFixture = () => {
  const root = mkdtempSync(join(tmpdir(), "library-build-"));
  cpSync(fixture, root, { recursive: true });
  symlinkSync(modules, join(root, "node_modules"), "dir");
  return root;
};

describe("buildLibrary", () => {
  test("compiles TypeScript and Sass, copies assets and rewrites style imports", () => {
    const root = copyFixture();
    const print = vi.fn();
    buildLibrary({ root, print });
    const distribution = join(root, "distribution");
    expect(readFileSync(join(distribution, "button/index.js"), "utf8")).toContain('from "./index.module.css"');
    expect(readFileSync(join(distribution, "button/index.module.css"), "utf8")).toBe(".button{color:red;padding:4px}");
    expect(existsSync(join(distribution, "button/index.d.ts"))).toBe(true);
    expect(existsSync(join(distribution, "style/token/_index.scss"))).toBe(true);
    expect(existsSync(join(distribution, "button/unit-test.js"))).toBe(false);
    expect(print).toHaveBeenCalledWith("built: 1 styles compiled, 2 files copied, 1 imports rewritten");
  });

  test("clears an earlier build first, and is silent by default", () => {
    const root = copyFixture();
    buildLibrary({ root });
    buildLibrary({ root, source: "source", output: "distribution", project: "tsconfig.build.json" });
    expect(existsSync(join(root, "distribution/button/index.js"))).toBe(true);
  });
});
