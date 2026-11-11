import { expect, test } from "vitest";
import { rewriteStyleImports } from "@sharadox/library-build-web-library/style-import";

test("points Sass module imports at their compiled CSS, in either quote style", () => {
  expect(
    rewriteStyleImports(`import styles from "./index.module.scss";\nimport other from '../a/index.module.scss';`),
  ).toBe(`import styles from "./index.module.css";\nimport other from '../a/index.module.css';`);
  expect(rewriteStyleImports('import "./global.scss";')).toBe('import "./global.scss";');
});
