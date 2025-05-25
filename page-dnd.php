<?php get_header(); ?>

<h1>
    Mastering Native Drag-n-Drop    
<h1>

<h5>Principle #1</h5>
<h2>Draggable Equals True</h2>
<p>Elements can be made draggable by adding the draggable attribute. Any element suitable for drag and drop can be made draggable with draggable="true" added to the HTML markup.</p>
<div class="ticket" draggable="true">
    &lt;div class="ticket" draggable="true">
</div>
<p>Shorthand approach to setting the attribute draggable will also (usually) work to make the element draggable. However we don't recommend this approach because results can vary.<p>
<div class="ticket" draggable="true">
    &lt;div class="ticket" draggable>
</div>

<h3>Adding & Removing Draggability with Javascript</h3>
<p>We will often need to create draggable elements dynamically. Just like most DOM attributes, we can set the draggable attribute to true to make the element draggable.</p>
<pre>
<code>
// Turn on draggability.
el.draggable = true;

// Turn off draggability.
el.draggable = false;
</code>
</pre>

<h5>Principle #2</h5>
<h2>Make Droppable Elements with Dragover Event</h2>
<p>To make a droppable area for our draggables we need to use the "dragover" Javascript event. By default dragover will block dropping, but the functionality is already inherit and supported. We just need to use preventDefault() on the event passed to the dragover callback.</p>
<pre>
<code>
// Use preventDefault within the dragover event.
function dragoverHandler( event ) {
    event.preventDefault();
}

// Attach callback to the dragover event. 
el.addEventListener("dragover", dragoverHandler);
</code>
</pre>

<p>In case it isn't clear "el" in the code example above holds the DOM element we want to make a droppable area. We can set this with document.getElementById() or document.querySelector(), or in a loop over elements returned by document.querySelectorAll().</p>

<h3>Droppable Zone Example</h3>
<p>This example uses static HTML5 elements. Later we will explore more dynamically created draggable/droppable elements made with document.createElement().</p>
<div id="dnd-example1" class="dnd-example">
    <div id="ticket-1" class="ticket" draggable="true">Droppable Ticket 001</div>
    <div id="droppable-1" class="droppable">
        <h2>Droppable Zone</h2>
    </div>
</div>
<p>Are you wondering the ticket didn't move into the droppable zone? That is what you would expect from a functional perspective, but at this point we are "dropping" the ticket, and the droppable zone is allowing the drop, but we are not doing anything beyond that. It is important to understand that it is up to use to write the handling of the drop, which we'll do next.</p>
<p>Javascript code for the previous example below:</p>
<pre>
<code>
const draggable1 = document.getElementById('ticket-1');
const dropzone1 = document.getElementById('droppable-1');

dropzone1.addEventListener( 'dragover', ( e ) => {
    console.log('dragover dz1...')
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'green';
});

dropzone1.addEventListener( 'drop', ( e ) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'blue';
});
</code>
</pre>

<blockquote>
    <h2>Key Concept 1</h2>
    <p>The cycle of events we need to handle in most drag-n-drop operations are "dragstart", "dragover", "drop" and "dragend". We can make some aspects of drag-n-drop work with as little as 2 of these events, but most implementations will require us to handle all 4.</p>
</blockquote>

<h5>Principle #3</h5>
<h2>Move Dropped Elements</h2>
<p>Now that we have mastered making draggable elements and droppable zones using the "dragover" event, we can move on to... moving. Moving elements is just one of many things we can do during a drag-n-drop operation, but it is the most common. We handle the movement of our draggable element(s) during the "drop" event attached to the droppable element. We also need to utilize the "dragstart" event to store a reference to the element we are dragging.</p>

<div id="dnd-example2" class="dnd-example">
    <div id="ticket-2" class="ticket" draggable="true">Droppable Ticket 002</div>
    <div id="droppable-2" class="droppable">
        <h2>Droppable Zone</h2>
    </div>
</div>

<p>Code for this example below. Note the use of "dragstart" where the target (droppable element) ID is stored using the event dataTransfer. This is a method provided by the browser to store a reference to the element being dragged, which we can then retrive in the drop handler.</p>

<pre>
<code>
const draggable2 = document.getElementById('ticket-2');
const dropzone2 = document.getElementById('droppable-2');

draggable2.addEventListener( 'dragstart', ( e ) => {
    e.dataTransfer.setData('text', e.target.id);
});

dropzone2.addEventListener( 'dragover', ( e ) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'green';
});

dropzone2.addEventListener( 'drop', ( e ) => {
    e.preventDefault();
    const ticketElId = e.dataTransfer.getData('text');
    const ticketEl   = document.getElementById( ticketElId ); 
    e.currentTarget.appendChild( ticketEl );
});
</code>
</pre>

<p>In the drop handler we retrieve the draggable ticket ID from e.dataTransfer.getData(). We can then insert the ticket into the dropzone with e.currentTarget.appendChild()</p>

<style>

.ticket {
    display: flex;
    background: rgb( 30, 30, 30 );
    color: rgb( 200, 200, 200 ); 
    width: 320px; 
    height: 120px; 
    border-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    font-size: 14px;
    align-items: center;
    margin: 16px;
    cursor: move;
}

.droppable {
    font-family: sans-serif;
    display: flex;
    background: rgb( 45, 45, 45 );
    color: rgb( 200, 200, 200 ); 
    width: 480px; 
    height: 120px; 
    box-sizing: border-box;
    font-size: 14px;
    align-items: center;
    margin: 16px;
    padding: 16px;
    border-radius: 16px;
}

pre {
    background: rgb( 30, 30, 30 );
    border-radius: 16px;
    padding: 16px;
    color: rgb( 200, 200, 200 ); 
}

.dnd-example {
    display: flex;
    align-items: center;
}

.dnd-example > h2 {
    font-size: 1.25rem;
    font-weight: 600;
}

</style>

<script>

/**** 
 * 
 * Example 1
 *
 ***/ 

const draggable1 = document.getElementById('ticket-1');
const dropzone1 = document.getElementById('droppable-1');

dropzone1.addEventListener( 'dragover', ( e ) => {
    console.log('dragover dz1...')
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'green';
});

dropzone1.addEventListener( 'drop', ( e ) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'blue';
});

/**** 
 * 
 * Example 2
 *
 ***/ 

const draggable2 = document.getElementById('ticket-2');
const dropzone2 = document.getElementById('droppable-2');

draggable2.addEventListener( 'dragstart', ( e ) => {
    e.dataTransfer.setData('text', e.target.id);
});

dropzone2.addEventListener( 'dragover', ( e ) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = 'green';
});

dropzone2.addEventListener( 'drop', ( e ) => {
    e.preventDefault();
    const ticketElId = e.dataTransfer.getData("text");
    const ticketEl   = document.getElementById( ticketElId ); 
    e.currentTarget.appendChild( ticketEl );
});

</script>

<?php get_footer(); ?>