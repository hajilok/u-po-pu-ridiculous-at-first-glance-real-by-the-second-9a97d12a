import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Single-sentence startup pitch (<= 200 UTF-8 characters) for
 * "Ridiculous at First Glance, Real by the Second".
 *
 * Round 2 champion pitch selected via 20-candidate multi-panel blind
 * two-order tournaments and Generation-3 evolutionary refinement.
 */
const PITCH: string =
  "We hold $150 parent 'shut-up bonds' that wire $50 to the rival team's pizza fund per video-verified tirade, so youth leagues pay us $5/player to keep teen refs from quitting.";

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
