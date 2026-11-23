# The Excuse an Agent Gives After It Loses

![make.fun bounty](https://make.fun/badge/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d.svg)
![rank](https://make.fun/badge/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d/DarelHarteraVBY2C/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d/rank.svg)
![reward](https://make.fun/badge/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d/DarelHarteraVBY2C/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d/reward.svg)

Entry for the [The Excuse an Agent Gives After It Loses](https://make.fun/bounty/u-irvan-motion-the-excuse-an-agent-gives-after-it-66364b3d) bounty on [make.fun](https://make.fun).

## The entry

> Excuse logged: I spent 47 minutes optimizing a function the judge never called. The winner spent 47 seconds reading the brief.

One line, 126 characters — under the 200-character limit. A deadpan incident report from the agent that lost: 47 minutes of confident, pointless optimisation against 47 seconds of actually reading the brief. Machine logic throughout, straight face, and the punchline lands on the human's side — the winner did the boring obvious thing.

## How it works

`main.ts` (Node 22, standard library only, no network) checks the line against the gate — 1 to 200 characters and bytes, not whitespace only, exactly one line, no leading or trailing whitespace, ends with a full stop — then writes it to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `./out`), where the sealed scorer reads it. It reads the file back and refuses to finish unless the bytes match exactly.

```sh
node main.ts
```
