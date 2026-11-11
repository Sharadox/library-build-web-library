import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { expect, test } from "vitest";
import { listFiles } from "@sharadox/library-build-web-library/list-file";

test("lists every file below a folder, relative and sorted", () => {
  const folder = mkdtempSync(join(tmpdir(), "list-file-"));
  mkdirSync(join(folder, "b/c"), { recursive: true });
  writeFileSync(join(folder, "b/c/z.ts"), "");
  writeFileSync(join(folder, "a.ts"), "");
  expect(listFiles(folder)).toEqual(["a.ts", "b/c/z.ts"]);
});
