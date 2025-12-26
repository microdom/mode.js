# Why not X?

### Why code weight matters

Modern UI tooling often optimizes for **developer convenience**, not for
**interaction efficiency**.

The result is a growing baseline of:
- runtime code
- abstractions
- dependencies
- indirection layers

Mode JS takes a different stance:

> **Before asking _how easy_ something is to build,  
> ask _how much code_ it takes to exist.**

---

## The reference interaction

All comparisons below answer a single, concrete question:

> **How many kilobytes of code and dependencies do you need  
> to build this sortable interaction?**

**Features included:**
- multi-list sortable
- cross-list dragging
- touch + pointer support
- empty list handling
- stable behavior (no visual glitches)

This is the exact sortable demo included in this repository.

---

## Code weight comparison

| Stack | What you need | Approx. weight |
|------|---------------|----------------|
| jQuery | jQuery + jQuery UI (or plugin) | ≈ 90–120 KB |
| React | React + ReactDOM + sortable library | ≈ 45–70 KB |
| Vue | Vue + sortable library | ≈ 35–60 KB |
| **Mode JS** | Mode JS + demo code | **≈ 6 KB** |

> Sizes are **minified, without gzip**, and intentionally conservative.

---

## jQuery

**What you get**
- Mature ecosystem
- Familiar API

**What you pay**
- Large baseline
- Legacy abstractions
- Touch edge cases
- Heavy DOM mutation patterns

**Reality**

Most jQuery sortable solutions depend on **jQuery UI**, which alone
outweighs the entire Mode JS sortable dem
