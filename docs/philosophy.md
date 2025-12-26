# Mode JS — Philosophy

Mode JS is built around one idea:

> **Interactions are not features.  
> They are relationships between movement, intent, and structure.**

---

## The problem with most interaction libraries

Most libraries start with a goal:
- “sortable”
- “draggable”
- “resizable”

Then they build abstractions *around that goal*.

Over time, this leads to:
- large APIs
- special cases
- flags and configuration
- broken edge cases
- poor touch behavior

The abstraction becomes heavier than the interaction itself.

---

## Mode JS takes the opposite approach

Mode JS does **not** model behaviors.

It models:
- pointer movement
- intent boundaries
- ownership of motion
- spatial relationships

Everything else is composed *outside* the core.

---

## Intent is explicit

On desktop:
- intent is obvious
- movement is precise

On touch:
- intent is ambiguous
- movement is noisy

Mode JS does not guess intent.
It requires you to define it.

This is why interactions built with Mode JS feel stable —
especially on touch devices.

---

## Structure matters more than state

Mode JS encourages you to think in terms of:
- containers
- items
- boundaries
- ownership

Not:
- indices
- flags
- modes
- magic states

This makes edge cases (like empty containers) *first-class*, not bugs.

---

## Minimalism is not a constraint

Mode JS is small because:
- it refuses to accumulate features
- it avoids premature abstraction
- it leaves decisions to the user

Small size is a **consequence**, not a goal.

---

## Demos are not features

Everything in `/demos` exists to answer one question:

> “How would you *think* with Mode JS?”

If something belongs in a demo but not in the core —
that’s a success, not a limitation.

---

## Final thought

Mode JS is not trying to be popular.

It is trying to be **honest**.

If you value:
- clarity over convenience
- composition over configuration
- intent over magic

Mode JS is for you.
