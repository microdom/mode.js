# Mode JS

**Mode JS** is a ~10kb, jQuery-inspired semantic layer for modern **vanilla JavaScript**.

It allows you to express **intent directly against the live DOM** —  
without wrapping elements, encapsulating events, or abstracting native APIs.

> Mode JS helps you *describe what you want to do*,  
> while staying fully inside the platform.

---

## Why Mode JS?

Modern JavaScript has powerful native APIs, but expressive DOM code still tends to be verbose or over-abstracted.

Mode JS exists for developers who:

- want **minimal code weight**
- want **zero DOM encapsulation**
- want **native events to stay native**
- want helpers that disappear after execution

Mode JS is not a framework.  
Mode JS is not reactive.  
Mode JS does not own state.

Mode JS is **syntax + intent**.

---

## Core idea: intent-driven DOM manipulation

Mode JS introduces a semantic way to address and operate on **live DOM elements**.

- Elements are always real DOM nodes
- Events are always native
- Assignments are always direct

Mode never replaces the DOM — it **compresses how you talk to it**.

---

## Example 1

```js
µ.l(document, "DOMContentLoaded", () => {

  µ.ax({ url: "/content", method: "GET" })
    .then(data => {

      µ("/[data-editable]/", {
        each: (el, i) => {

          const val = data.response[`block_${i}`]
          if (!val) return

          el.dataset.editable === "text"
            ? µ(el, { html: val })
            : el.dataset.editable === "image"
              ? µ(el, "img").src = val
              : null
        }
      })

    })

})
