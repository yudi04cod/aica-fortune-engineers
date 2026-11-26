// Fortune Cookie Funnies for Engineers — make.fun entry.
//
// Writes one original one-line fortune cookie message for a software
// engineer to /output/entry.txt. Fully deterministic: the same line on
// every run, no input, no randomness, no network, no environment reads.
import { mkdirSync, writeFileSync } from "node:fs";

// The fortune: a prediction with the punchline at the end. Every engineer
// has a piece of "temporary" 2 a.m. code that quietly became load-bearing.
const FORTUNE =
  "You will meet the code you wrote at 2 a.m. and swore was temporary. It is now load-bearing.";

const MAX_CHARS = 120;
const OUT_PATH = "/output/entry.txt";

function main(): void {
  const line = FORTUNE.trim();

  // Gate: 1 to 120 characters, a single line, not only whitespace.
  if (line.length === 0 || line.length > MAX_CHARS) {
    throw new Error(`Fortune must be 1-${MAX_CHARS} chars, got ${line.length}.`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Fortune must be a single line.");
  }

  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the fortune, nothing else.
  writeFileSync(OUT_PATH, line, "utf8");
  console.log(`Wrote ${line.length} chars to ${OUT_PATH}: ${line}`);
}

main();
