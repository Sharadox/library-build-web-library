/**
 * Points compiled JavaScript at compiled stylesheets: `./index.module.scss` becomes `./index.module.css`, so
 * applications need no Sass to use the library.
 *
 * @example
 * rewriteStyleImports('import styles from "./index.module.scss";'); // 'import styles from "./index.module.css";'
 */
export function rewriteStyleImports(code: string): string {
  return code.replace(/(["'])([^"']+)\.module\.scss\1/g, "$1$2.module.css$1");
}
