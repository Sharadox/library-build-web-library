/** What happens to each non-TypeScript file of a library's source. */
export interface BuildPlan {
  /** Sass modules compiled to CSS next to the JavaScript (`index.module.scss` → `index.module.css`). */
  compile: string[];
  /** Files copied as they are (CSS, Sass partials and tokens, fonts, images, JSON data). */
  copy: string[];
}
