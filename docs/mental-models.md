# Mental Models

Mode JS is easier to use when you stop thinking in terms of
*features* and start thinking in terms of *relationships*.

This document describes the mental models that guide Mode JS usage.

---

## 1. Movement comes first

Most UI libraries start with components or state.

Mode JS starts with **movement**.

Before asking:
- “What is this?”
- “What component owns it?”

Ask instead:
- “What can move?”
- “Who owns that movement?”
- “When does movement begin and end?”

Movement is the primitive.
Everything else is derived.

---

## 2. Intent is not implicit

On desktop, intent is obvious.
On touch, intent is ambiguous.

Mode JS never assumes intent.

Instead, intent must be **earned**:
- by distance
- by direction
- by time
- or by explicit rules

This is why interactions built with Mode JS feel stable —
especially on touch devices.

---

## 3. Containers are first-class citizens

Most implementations think in terms of items.

Mode JS encourages thinking in terms of **containers**:
- lists
- regions
- boundaries
- drop zones

An empty container is still a container.

This makes edge cases structural instead of conditional.

---

## 4. Structure beats state

State-based interactions tend to grow:
- flags
- modes
- booleans
- special cases

Mode JS favors **structure**:
- where something is
- what it belongs to
- who owns it

When structure is correct, state becomes trivial.

---

## 5. Ownership of movement matters

At any moment, movement has an owner:
- the pointer
- the dragged item
- the container
- or nothing at all

Being explicit about ownership prevents:
- race conditions
- ghost interactions
- stuck states

Mode JS encourages you to *transfer* ownership consciously.

---

## 6. Demos are thinking tools

Demos in this repository are not:
- plugins
- extensions
- presets

They are **mental exercises**.

Each demo answers:
> “What happens if we apply these models to a real interaction?”

The sortable demo is not about sorting.
It’s about intent, structure, and movement.

---

## 7. Small code is a consequence

Mode JS does not chase small size.

Small size emerges because:
- fewer assumptions are made
- fewer abstractions are layered
- fewer features are accumulated

When mental models are correct,
the code naturally shrinks.

---

## Final thought

If an interaction feels hard to express with Mode JS,
don’t add features.

Revisit the mental model.

The solution is usually structural, not technical.
