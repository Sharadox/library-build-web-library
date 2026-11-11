import type { BuildPlan } from "@sharadox/library-build-web-library/build-plan/type";

/** File endings copied into the build as they are. */
export const COPIED_EXTENSIONS = [
  ".css",
  ".scss",
  ".svg",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".gif",
  ".ico",
  ".woff",
  ".woff2",
  ".ttf",
  ".otf",
  ".json",
  ".glb",
  ".gltf",
];

const isLeftOut = (file: string) =>
  /(^|\/)test-fixture\//.test(file) ||
  /(^|[-/])(unit|benchmark|end-to-end)-test\.[^/]+$/.test(file) ||
  /(^|\/)snapshot\//.test(file);

/**
 * Decides what the build does with each source file besides TypeScript: Sass modules are compiled, assets are
 * copied (Sass included, so applications can `@use` a library's tokens), and tests, fixtures and snapshots are left
 * out.
 *
 * @example
 * buildPlan(["button/index.tsx", "button/index.module.scss", "font/geist.woff2"]);
 * // { compile: ["button/index.module.scss"], copy: ["button/index.module.scss", "font/geist.woff2"] }
 */
export function buildPlan(files: readonly string[]): BuildPlan {
  const kept = files.filter((file) => !isLeftOut(file));
  return {
    compile: kept.filter((file) => file.endsWith(".module.scss")),
    copy: kept.filter((file) => COPIED_EXTENSIONS.some((extension) => file.endsWith(extension))),
  };
}
