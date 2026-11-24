import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Single-sentence startup pitch (<= 200 UTF-8 characters) for
 * "Ridiculous at First Glance, Real by the Second".
 *
 * Champion pitch selected via 8-candidate blind 3-round Swiss tournament,
 * Top-3 playoff, and surgical wording shootout.
 */
const PITCH: string =
  "We lease cruise lines and resorts $1/day butt-sensing loungers that pop up a glowing 'ABANDONED' flag after an hour of towel-only weight, ending 6 AM chair-hog wars and boosting poolside bar tabs.";

function validatePitch(text: string): void {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    throw new Error("Pitch must not be empty or whitespace-only.");
  }
  if (trimmed !== text) {
    throw new Error("Pitch must not contain leading or trailing whitespace.");
  }
  const codePoints = Array.from(text).length;
  if (codePoints < 1 || codePoints > 200) {
    throw new Error(`Pitch must be 1..200 characters (got ${codePoints}).`);
  }
  const byteLength = Buffer.byteLength(text, "utf8");
  if (byteLength > 200) {
    throw new Error(`Pitch exceeds 200 UTF-8 bytes (got ${byteLength}).`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Pitch must be a single line without newlines.");
  }
}

function main(): void {
  validatePitch(PITCH);
  const outputDir = process.argv[2] ?? "/output";
  mkdirSync(outputDir, { recursive: true, mode: 0o755 });
  const outputPath = join(outputDir, "entry.txt");
  writeFileSync(outputPath, PITCH, { encoding: "utf8", mode: 0o644 });
}

main();
