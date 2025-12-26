
function µ(el, fns) {
    const _ = null
    const roneTag = (/^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i)
    const rhtml = /<|&#?\w+;/
    const rtagName = (/<([a-z][^\/\0>\x20\t\r\n\f]*)/i)
    const whitespace = "[\\x20\\t\\r\\n\\f]"
    const rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g")
    const tr = (s) => s.replace(/^\s\s*/, '').replace(/\s\s*$/, '').replace(/(\r\n|\n|\r)/gm, "").replace(/>\s+</g, '><')
    const arr =  ( b , n=null) => n? n=='array'? Array.from(b) : Object[n](b) : Object.entries(b) 
    function el_(s) {
        s.forEach(e => e.setAttribute(`µicro`, "µ"))
        _el = getEl(`/[µicro]/`)
        _el.forEach(e => e.removeAttribute(`µicro`))
    }
    const nodeDom = (t, att, tx, ch) => {
        let o = document.createElement(t)
        function val(v) {
            return typeof v !== 'object' ? v : Object.keys(v).map((e) => `${e}:${v[e]}`).join(';')
        }
        for (const key in att) o.setAttribute(key, val(att[key]))
        if (tx) {
            let newtext = document.createTextNode(tx)
            o.appendChild(newtext)
        }
        for (const key in childs) o.appendChild(childs[key])
        return o
    }
    let _el = el !== _ ? getEl(el) : el
    if (!!fns) {
        for (let [fn, p] of Object.entries(fns)) {
            fn = fn.replace(/_/g, '')
            _el && typeof eval(fn) === 'function' ? eval(fn)(p) : null
        }
    }
    function getEl(e) {
        e = isStr(e) ? tr(e) : e
        const sel = (s, c) => s.at(0) == '/' && s.at(-1) == '/' ? c.querySelectorAll(s.replace(/^\/|\/$/g, '')) : c.querySelector(s)
        if (isEl(e) || isList(e)) {
            return e
        } else if (isArr(e)) {
            let s, c
            if (isStr(e[1])) {
                c = document.querySelector(e[1])
            } else if (isEl(e[1])) {
                c = e[1]
            }
            if (isStr(e[0])) {
                s = e[0]
                return sel(s, c)
            }
            if (isEl(e[0])) {
                return e
            }
            return console.error('Array error')
        } else if (isHtml(e)) {
            return parseHTML(e)
        } else if (isStr(e)) {
            return sel(e, document)
        }
    }
    function isArr(e) { return Array.isArray(e) }
    function isEl(e) { return e instanceof HTMLElement /* || e.nodeType  */ }
    function isList(e) { return NodeList.prototype.isPrototypeOf(e) }
    function isStr(e) { return typeof e === 'string' || e instanceof String }
    function isColl(e) { return HTMLCollection.prototype.isPrototypeOf(e) }
    function isHtml(e) { return e[0] === "<" && e[e.length - 1] === ">" }

    function html(p) {
        if (!isStr(p)) return false
        isList(_el) || isArr(_el) ? _el.forEach(el => el.innerHTML = p) : _el.innerHTML = p
    }
    function text(p) {
        if (!isStr(p)) return false
        isList(_el) || isArr(_el) ? _el.forEach(el => el.textContent = p) : _el.textContent = p
    }
    function parseHTML(p) {
        let o = nodeDom('div', {}, '', '')
        o.insertAdjacentHTML("beforeend", p.replace(/\s+/g, ' '))
        return o.firstChild
    }
    function insert(p) {
        if ( isHtml(p)) _el.insertAdjacentHTML("beforeend", p.replace(/\s+/g, ' '))
        else if( isEl(p))   _el.appendChild(p)
    }
    function getFlag(s) {
        //console.log("getFlag > fro procedure! "+s)
    }
    function on(p) {
        const add = (e, fn, el = null) => {
            el = !!el ? el : _el
            console.log(el, "····")
            isList(el) || isArr(el) ? el.forEach(l => l.addEventListener(e, fn, false)) :
                el.addEventListener(e, fn, false)
        }
        const ctm = (c, t, fn) => {
            _el.addEventListener(e, fn, false)
        }
        const on = (o) => {
            if (o.e)
                isArr(o.e) ? o.e.forEach(n => add(n, o.fn)) : add(o.e, o.fn)
            if (o.l) {
                isArr(o.l) ? o.l.forEach(n => add(o.e, n.fn, n.tg)) : add(o.e, o.l.fn, o.l.tg)
            }
        }
        isArr(p) ? p.forEach(e => on(e)) : on(p)
    }

    function each(p) {
        isList(_el) || isArr(_el) ? _el.forEach(p) : p(_el)
    }
    function proceed(p) {
        _el = p(_el)
    }
    function find(p) {
        const xel = (s, c) => s.at(0) == '/' && s.at(-1) == '/' ? c.querySelectorAll(s.replace(/^\/|\/$/g, '')) : c.querySelector(s)
        let n, found = document.createElement('div')
        isList(_el) || isArr(_el) ? _el.forEach(el => {
            n = xel(p, el)
            if (n != null) found.append(n)
        }) : _el = getEl([p, _el])
        if (found.childNodes.length > 0) _el = found.childNodes
    }
    function css(p) {
        const add = (s, v) => {
            isList(_el) || isArr(_el) ? _el.forEach(el => el.style[s] = v) : _el.style[s] = v
        }
        Object.keys(p).map((k) => add(k, p[k]))
    }
    function classes(p) {
        const add = (s, v) => {
            const set = (el, s, v) => { isArr(v) ? v.forEach(i => el.classList[s](i)) : el.classList[s](v) }
            isList(_el) || isArr(_el) ? _el.forEach(el => set(el, s, v)) : set(_el, s, v)
        }
        Object.keys(p).map((k) => add(k, p[k]))
    }
    function clss(p) {
        const add = (s, v) => {
            const set = (el, s, v) => { isArr(v) ? v.forEach(i => el.classList[s](i)) : el.classList[s](v) }
            isList(_el) || isArr(_el) ? _el.forEach(el => set(el, s, v)) : set(_el, s, v)
        }
        Object.keys(p).map((k) => add(k, p[k]))
    }
    function attr(p) {
        const bin =(el,s,v) => {
            switch (s) {
                case "set": el.setAttribute(arr(v)[0][0],arr(v)[0][1]);break
                case "get": el.getAttribute(v);break
                case "del": el.removeAttribute(v);break
                case "has": el.hasAttribute(v);break
                case "tog": el.toggleAttribute(v);break
                case "list": el.getAttributeNames()
            }
        }
        const add = (s, v) => {
            const set = (el, s, v) => { isArr(v) ? v.forEach(i => bin(el,s,i)) : bin(el,s,v) }
            isList(_el) || isArr(_el) ? _el.forEach( el => set(el, s, v)) : set(_el, s, v)
        }
        Object.keys(p).map((k) => add(k, p[k]))
    }
    function prev(p) {
        if (isList(_el)) return false
        if (p) {
            let prev = _el.previousElementSibling
            while (prev && !prev.matches(p)) prev = prev.previousElementSibling
            _el = prev
        } else {
            _el = _el.previousElementSibling
        }
    }
    function next(p) {
        if (isList(_el)) return false
        if (p) {
            let next = _el.nextElementSibling
            while (next && !next.matches(p)) next = next.nextElementSibling
            _el = next;
        } else {
            _el = _el.nextElementSibling
        }
    }

    function parents(p) {
        if (!isEl(_el)) return false
        const parents = []
        el = _el
        while ((el = el.parentNode) && el !== document) {
            (!p || el.matches(p)) ? parents.push(el) : _
        }
        _el = parents
    }

    function childs(p) {
        if (!isEl(_el)) return false
        let el = []
        for (const e of _el.childNodes) {
            isEl(e) && (!p || e.matches(p)) ? el.push(e) : _
        }
        el_(el)
    }
    function after(p) {
        if (!isEl(_el)) return false
        _el.parentNode.insertBefore(p, _el.nextSibling);
    }
    function children(p) {
        if (!isEl(_el)) return false
        el = [..._el.children].filter((child) => p ? child.matches(p) : child)
        el_(el)
    }

    function last(p) {
        if (!isList(_el) && !isArr(_el)) return null
        let child
        isStr(p) ?
            _el.forEach(e => e.matches(p) ? child = e : _)
            : _el.forEach(e => child = e)
        _el = child
    }

    function first(p) {
        if (!isList(_el) && !isArr(_el)) return null
        if (isStr(p)) {
            try {
                _el.forEach(r => { if (r.matches(p)) throw _el = r, "break" })
            } catch (r) { if ("break" !== r) throw r }
        } else {
            try {
                _el.forEach((r, i) => { if (i === 0) throw _el = r, "break" })
            } catch (r) { if ("break" !== r) throw r }
        }
    }
    function siblingsAll(p) {
        if (!isEl(_el)) return false
        el = [..._el.parentNode.children].filter((child) => p ? child.matches(p) : child)
        el_(el)
    }
    function siblings(p) {
        if (!isEl(_el)) return false
        el = [..._el.parentNode.children].filter((child) => p ? child.matches(p) && child !== _el : child !== _el)
        el_(el)
    }
    function filter(p) {
        if (!isList(_el) || !p) return false
        el = [..._el].filter((item) => item.matches(p))
        el_(el)
    }
    function wrap(p) {
        const add = (e, w) => {
            e.parentElement.insertBefore(w, e)
            w.appendChild(e)
        }
        (isList(_el) || isArr(_el)) ? _el.forEach(e => add(e, p.cloneNode())) : add(_el, p.cloneNode())
    }
    return isArr(_el) && _el.length === 0 ? _ : _el
}
function moveDOM(fns) {
    const _ = null
    let _return
    if (fns) {
        for (let [fn, params] of Object.entries(fns)) {
            fn = fn.replace(/_/g, '')
            typeof eval(fn) === 'function' ? eval(fn)(params) : null
        }
    }
    function isArr(e) { return Array.isArray(e) }
    function isEl(e) { return e instanceof HTMLElement }
    function isList(e) { return NodeList.prototype.isPrototypeOf(e) }
    function isStr(e) { return typeof e === 'string' || e instanceof String }
    function wrap(p) {
        const add = (e, w) => {
            e.parentElement.insertBefore(w, e)
            w.appendChild(e)
        }
        isList(p.el) ? p.el.forEach(e => add(e, p.wrp.cloneNode())) : add(p.el, p.wrp.cloneNode())
    }

    function slideUp(p) {
        let css = {
            transitionProperty: 'height, margin, padding',
            transitionDuration: p.t + 'ms',
            boxSizing: 'border-box',
            height: p.el.offsetHeight + 'px'
        }
        let css2 = {
            overflow: 'hidden',
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0
        }
        µ(p.el, { css: css })
        p.el.offsetHeight
        µ(p.el, { css: css2 })
        setTimeout(() => {
            ['height', 'padding-top', 'padding-bottom', 'margin-top', 'margin-bottom', 'overflow', 'transition-duration', 'transition-property']
                .forEach(i => p.el.style.removeProperty(i))
            p.el.style.display = 'none'
            p.fn ? p.fn() : _
        }, p.t)
    }

    function slideDown(p) {
        let display = getComputedStyle(p.el).display
        if (display === 'none') display = 'block'
        p.el.style.display = display
        let height = p.el.offsetHeight
        const time = Math.ceil(p.t * (height / 200))
        console.log("time >>", time)
        let css = {
            overflow: 'hidden',
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            marginBottom: 0,
        }
        let css2 = {
            boxSizing: 'border-box',
            transitionProperty: "height, margin, padding",
            transitionDuration: time + 'ms',
            height: height + 'px'
        }

        µ(p.el, { css: css })
        p.el.offsetHeight
        µ(p.el, { css: css2 })
        let a = ['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
            .forEach(i => p.el.style.removeProperty(i))
        setTimeout(() => {
            ['height', 'overflow', 'transition-duration', 'transition-property']
                .forEach(i => p.el.style.removeProperty(i))
            // (↓)callback
            p.fn ? p.fn() : _
        }, time);
    }

    function slideToggle(p) {
        getComputedStyle(p.el).display === 'none' ? slideDown(p) : slideUp(p)
    }

    function offset(p) {
        let rect = p.getBoundingClientRect(), _body = document.body
        _return = {
            top: rect.top + _body.scrollTop,
            left: rect.left + _body.scrollLeft
        }
    }
    function pos(p) {
        let rect = p.getBoundingClientRect(), _body = document.body
        _return = {
            top: rect.top + _body.scrollTop,
            left: rect.left + _body.scrollLeft
        }
    }

    function last(p) {
        _return = p.length ? p[p.length - 1] : _

    }
    function first(p) {
        _return = p.length ? p[0] : _
    }
    if (!!_return) return _return
}
//// HELPERS
µ.e = ( e , d=null , b = !0 )=> b? new CustomEvent( e, { detail: d, bubbles: b }):new Event(e)
µ.l = ( n , e , fn ) => n.addEventListener(e,(fn))
µ.d = ( e, n=null )=> n ? n.dispatchEvent(e) : null
µ.t = ( e, o=null ) =>  ( e.preventDefault(), e.stopPropagation(), o)? µ(e.target.closest(o)): e.target 
µ.a = ( b , t=null ) => t? t=='array'? Array.from(b) : Object[t](b) : Object.entries(b)  // t= Object types ( keys, values)
µ.ar = µ.a
µ.ax = ( options ) =>{
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const method = options.method ? options.method.toUpperCase() : 'GET';
    let url = options.url || '';
    const isGet = method === 'GET';
    const headers = options.headers || {};
    if (isGet && options.data) {
      const queryString = new URLSearchParams(options.data).toString();
      url += (url.includes('?') ? '&' : '?') + queryString;
    }

    xhr.open(method, url, true);
    for (let key in headers) {
      xhr.setRequestHeader(key, headers[key]);
    }
    if (!headers['Content-Type'] && !(options.data instanceof FormData) && method !== 'GET') {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }

    if (options.timeout) {
      xhr.timeout = options.timeout;
    }

    xhr.onload = () => {
      const isSuccess = xhr.status >= 200 && xhr.status < 300;
      let response = xhr.responseText;

      try {
        response = JSON.parse(response);
      } catch (e) { /* Not JSON */ }

      if (isSuccess) {
        resolve({ response, status: xhr.status, xhr });
      } else {
        reject({ error: xhr.statusText, status: xhr.status, xhr });
      }
    };

    xhr.onerror = () => {
      reject({ error: xhr.statusText, status: xhr.status, xhr });
    };

    let payload = null;
    if (!isGet && options.data) {
      if (options.data instanceof FormData) {
        payload = options.data;
      } else {
        payload = JSON.stringify(options.data);
      }
    }
    xhr.send(payload);
  });
}


if (typeof window !== 'undefined') {
window._ = null
window.html = String.raw
  window.µ = µ
  window._µ = moveDOM
}