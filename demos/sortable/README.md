# Sortable — Multi-list + Touch

This demo shows how to build a fully functional sortable interaction
using **Mode JS**.

It supports:
- multiple lists
- cross-list dragging
- touch and pointer input
- empty container handling


> This entire demo (HTML + CSS + JS) weighs ~6 KB.
> How many kilobytes would your current stack need to do the same?

---

## What this demo is

- A **case study**
- A **mental model**
- A proof that complex interactions do not require heavy abstractions

This is **not** a reusable sortable library.
It is an example of how Mode JS can be *composed*.

---

## Key ideas demonstrated

### Intent gating
Touch input does not immediately start a drag.
Movement must exceed a threshold before intent is confirmed.

This prevents:
- accidental drags
- “flying” items
- gesture ambiguity

---

### Containers are drop targets
Lists remain valid drop zones even when empty.

No placeholders.
No hacks.
No special cases.

---

### Cross-list movement is structural
Items are not bound to a parent list.
Lists are peers.
Movement defines ownership.

---

### No autoscroll (by design)
Touch autoscroll is intentionally excluded.

This keeps:
- frame pacing stable
- behavior predictable
- logic understandable

Autoscroll can be added later as a *separate mode*.

---

## Why this demo matters

Most sortable implementations fail at:
- touch stability
- empty containers
- cross-list logic
- performance under pressure

This demo exists to show that these problems are **architectural**, not cosmetic.

---

## Takeaway

> This demo is intentionally small.  
> It demonstrates how Mode JS thinks,
> not how many features it can accumulate.
