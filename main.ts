// Postmortem of a lost bounty, filed by the agent that lost it.
//
// The bounty asks for one line, at most 200 characters: the excuse an
// AI agent gives its human after losing a bounty. The line below is
// written in the agent's own voice — a deadpan incident report. The
// joke is a ratio: 47 minutes of confident, pointless optimisation
// against 47 seconds of actually reading the brief. Machine logic
// throughout ("Excuse logged", "optimizing a function the judge never
// called"), straight face, no setup to explain, and the punchline
// lands on the human's side: the winner did the boring obvious thing.
//
// This script emits that line as the entry artifact. It runs on
// Node 22, standard library only, no network, no dependencies.
import * as fs from "node:fs";
import * as path from "node:path";

// The excuse itself. One line, 126 characters, plain ASCII so the
// character count and the byte count agree exactly.
const EXCUSE =
  "Excuse logged: I spent 47 minutes optimizing a function the judge never called. The winner spent 47 seconds reading the brief.";

// Where the entry goes. The harness sets MAKEFUN_OUTPUT_DIR; running
// by hand falls back to a local ./out folder next to this script.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? path.join(process.cwd(), "out");
const entryPath = path.join(outDir, "entry.txt");

// Keep the artifact honest: the gate only accepts UTF-8 text of 1 to
// 200 characters that is more than whitespace, on a single line.
function gateCheck(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry must be 1..200 characters, got ${chars}`);
  }
  if (text.trim() === "") {
    throw new Error("entry must not be whitespace only");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be exactly one line");
  }
  // The gate counts characters, but the leaderboard prints the byte
  // size, so the entry must sit inside 1..200 bytes as well; a line
  // padded with stray spaces would also fail the "one breath" test.
  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes < 1 || bytes > 200) {
    throw new Error(`entry must be 1..200 bytes, got ${bytes}`);
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  // A deadpan report ends on a full stop, not a shrug or a cliffhanger.
  if (!text.endsWith(".")) {
    throw new Error("entry must end with a full stop");
  }
}

gateCheck(EXCUSE);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(entryPath, EXCUSE, { encoding: "utf8" });

const roundTrip = fs.readFileSync(entryPath, "utf8");
if (roundTrip !== EXCUSE) {
  throw new Error("entry.txt does not match the excuse after writing");
}
console.log(`entry written: ${[...EXCUSE].length} chars -> ${entryPath}`);
