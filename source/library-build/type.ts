export interface LibraryBuildOptions {
  /** The library folder; the current folder by default. */
  root?: string;
  /** Source and output folders, relative to `root`. */
  source?: string;
  output?: string;
  /** The TypeScript project that emits the JavaScript; `tsconfig.build.json` by default. */
  project?: string;
  /** Prints progress; silent by default. */
  print?: (line: string) => void;
}
