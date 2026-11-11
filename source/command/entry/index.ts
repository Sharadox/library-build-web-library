#!/usr/bin/env node
// The library-build command.
import { buildLibrary } from "@sharadox/library-build-web-library/library-build";

buildLibrary({ print: (line) => console.log(line) });
