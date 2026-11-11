import { expect, test } from "vitest";
import { buildPlan } from "@sharadox/library-build-web-library/build-plan";

test("compiles Sass modules, copies assets and leaves tests out", () => {
  expect(
    buildPlan([
      "button/index.tsx",
      "button/index.module.scss",
      "button/unit-test.tsx",
      "style/token/index.scss",
      "font/geist.woff2",
      "panel/index.module.css",
      "globe/land.json",
      "hero/test-fixture/image.png",
      "home/snapshot/desktop/home.png",
      "home/visual-end-to-end-test.ts",
      "notes.md",
    ]),
  ).toEqual({
    compile: ["button/index.module.scss"],
    copy: [
      "button/index.module.scss",
      "style/token/index.scss",
      "font/geist.woff2",
      "panel/index.module.css",
      "globe/land.json",
    ],
  });
});
