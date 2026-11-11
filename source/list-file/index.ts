import { readdirSync } from "node:fs";
import { join, relative } from "node:path";

/**
 * Every file under a folder, as paths relative to it (with `/`), sorted.
 *
 * @example
 * listFiles("source"); // ["component/button/index.tsx", "component/button/index.module.scss", …]
 */
export function listFiles(folder: string): string[] {
  return readdirSync(folder, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => relative(folder, join(entry.parentPath, entry.name)).split("\\").join("/"))
    .sort();
}
