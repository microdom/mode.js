

const SCROLL_SPEED =  12
const DEAD_ZONE = 8
const SCROLL_ZONE = 60
let pointerType = "mouse"
let pointerY = 0
let swap=true
let dragged,draggedAt, target= null
// listeners helper
µ.l( document,"dragover", (e) => { pointerY = e.clientY })
// Custom Helper: µ.in  ( _ = null from mode.js )
µ.in = ( n,t=_) => !t? n.innerHTML: n.innerText

const indicator = µ(`<li></li>`,{attr:{set:{pointer:true}},css:{display:'none'}})
const allower = µ(html`
    <label for="crossover" >Allow crossover
    <input type="checkbox" name="crossover" id="crossover"  checked/>
    </label>`,
    { on: { e: "change",  fn: (e) => { swap = e.target.checked }} }
    )
µ(`section`).prepend(allower)
µ(`/[sortable]/`, { 
    each:(ul)=> ul.append( µ(`<li></li>`,{ attr:{set:{empty:true,draggable:true}}, 
    on:[{
        e: "dragover",
        fn: (e) => {
            e.preventDefault()
            const t = e.target
            if ( !t || t === dragged || t === indicator || !swap && t.closest('ul')!==draggedAt  ) return
            console.log("empty --> ",t) 
            const rect = t.getBoundingClientRect()
            const centerY = rect.top + rect.height / 2
            µ( indicator, { css:{ display:'block'} } )
            if ( pointerY > centerY + DEAD_ZONE )
                ( indicator.previousSibling !== t )? t.before(indicator):_
            else if (pointerY < centerY - DEAD_ZONE)
                ( indicator.nextSibling !== t )? t.before(indicator):_
        }
    },
    { e:"pointerup",  fn: onPointerUp },
    { e:"pointerdown",  fn: onPointerDown },
  ]
}))})
µ(`/[sortable] li:not([empty])/`, {
each: (item,i) => {
    µ(item, {
    attr:{ set: {draggable:true }},
    on: [
        { e: "dragstart",  fn: (e) => ( 
            dragged =  µ( e.target, { classes:{ add:'dragging' }}), 
            draggedAt =  µ( e.target).closest('ul'), 
            µ( indicator, { html: µ.in(e.target) }) )  },
        { e: "dragenter",  fn: (e) => ( t = e.target , target = (!t || t === dragged || t === indicator )? target : e.target) },
        { e: "dragover",
        fn: (e) => {
            e.preventDefault()
            const t = e.target
            autoScroll()
            // if (!swap && t.closest('ul')!== draggedAt ) t.style.cursor = "not-allowed" 
            if ( !t || t === dragged || t === indicator || !swap && t.closest('ul')!==draggedAt  ) return
            const rect = t.getBoundingClientRect()
            const centerY = rect.top + rect.height / 2
            µ( indicator, { css:{ display:'block'} } )
            if ( pointerY > centerY + DEAD_ZONE )
                ( indicator.previousSibling !== t )? t.after(indicator):_
            else if (pointerY < centerY - DEAD_ZONE)
                ( indicator.nextSibling !== t )? t.before(indicator):_
            
        }
        },
        {
        e: "dragend",
        fn: (e) => {
            if( indicator.style.display !== "none") 
                µ( indicator, { css:{ display:'none'}}).after( µ( dragged, { classes:{ remove:'dragging' }}))
            µ( `/li.dragging/`, { classes:{ remove:'dragging' }})
            saveSort(dragged.closest('ul'))
            dragged,target = null
        }
        },
    ]
    })
}
})[0].before(indicator)
///
function autoScroll() {
    const y = pointerY
    const h = window.innerHeight
    if (y < SCROLL_ZONE) 
        window.scrollBy(0, -SCROLL_SPEED)
    else if (y > h - SCROLL_ZONE)   
    window.scrollBy(0, SCROLL_SPEED)
}
function saveSort(l){
    µ(['/[draggable]:not([empty])/',l]  , { each: ( n,i ) => µ( n,{html:`#${i+1} ${ µ.in(n).split(' ')[1]}`}) })
    l!== draggedAt ? µ(['/[draggable]:not([empty])/', draggedAt]  , { each: ( n,i ) => µ( n,{html:`#${i+1} ${ µ.in(n).split(' ')[1]}`}) }):_
}

// ::::::::::::::::::::::
//// TOUCH SUPPORT ////
// ::::::::::::::::::::::

let isPointerDragging = false
µ(`/[sortable] li[draggable]/`, {
each: (item,i) => {
    µ(item, {
    on: [
        { e:"pointerdown",  fn: onPointerDown },
        { e:"pointermove",  fn:  onPointerMove },
        { e:"pointerup",  fn: onPointerUp },
        { e:"pointercancel",  fn: onPointerUp }
    ]
    })
}
})

function moveIndicator(target, clientY) {
    console.log('moveIndicator > ', target.hasAttribute('empty') )
    if (!target || target === dragged || target === indicator) ReadableStreamDefaultController
    const rect = target?.getBoundingClientRect()
    const centerY = rect.top + rect.height / 2
    if (clientY > centerY + DEAD_ZONE) {
        if (indicator.previousSibling !== target)
            target.hasAttribute('empty')? target.before(indicator) : target.after(indicator)
    } else if (clientY < centerY - DEAD_ZONE) {
        if (indicator.nextSibling !== target ) target.before(indicator)
    }
    
}
///
function onPointerDown(e) {
    if (e.pointerType === "mouse") return 
    pointerType = e.pointerType  // 🔑 store it
    dragged = e.currentTarget
    draggedAt =   µ(dragged, {classes:{add:'dragging'}}).closest('ul')
    dragged.after(indicator)
    isPointerDragging = true
    // dragged.classList.add("dragging")
    µ( indicator, { css:{display:'block'},html: µ.in(e.target) }) 
    dragged.setPointerCapture(e.pointerId)
}
///
function onPointerMove(e) {
    if (!isPointerDragging  ) return
    pointerY = e.clientY  // 
    const el = document.elementFromPoint(e.clientX, e.clientY)
    if (!swap && el.closest('ul')!==draggedAt ) return
    const target = el?.closest("li[draggable]") || el?.closest("li[empty]")
    if(target ) moveIndicator(target, e.clientY)
}
///
function onPointerUp(e) {
    if (!isPointerDragging) return
    µ( indicator, { css:{ display:'none'},html: '' })
    .after( µ( dragged, { classes:{ remove:'dragging'}}))
    µ( '/.dragging/', {classes:{ remove:'dragging'}})
    dragged.releasePointerCapture(e.pointerId)
    saveSort(dragged.closest('ul')) 
    draggedAt, dragged = null
    isPointerDragging = false
}
