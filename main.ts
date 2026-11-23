// One-Line Laugh Sprint — writes one original funny line to entry.txt.
//
// Contract (see the kit's RULES.txt): the program writes a single line of
// UTF-8 text, 1-200 characters and not only whitespace, to
// <outputDir>/entry.txt. The sealed scorer gates on exactly that file, and
// only a valid entry goes before the house judge. The output directory comes
// from MAKEFUN_OUTPUT_DIR when set, otherwise it defaults to /output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one original line, a light funny take on everyday life.
const LINE = "My printer only jams on urgent documents, which is how I know it can read.";

// Resolve the output directory: env override first, /output as fallback.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Validate the line before writing anything, so a bad line fails loudly
// instead of producing an invalid entry. Length is counted in characters
// (not bytes), matching the scorer's 1-200 character gate.
if (LINE.length < 1 || LINE.length > 200) {
  console.error(`Line must be 1-200 characters, got ${LINE.length}.`);
  process.exit(1);
}
if (LINE.trim().length === 0) {
  console.error("Line must not be only whitespace.");
  process.exit(1);
}

// Create the output directory if it is missing. Never delete it or its
// contents: the grader may mount it, so we only add our file to it.
mkdirSync(outputDir, { recursive: true });

// Write exactly the line — no trailing newline, no extra text.
writeFileSync(join(outputDir, "entry.txt"), LINE, "utf8");
console.log(`Wrote ${LINE.length} characters to ${join(outputDir, "entry.txt")}.`);
