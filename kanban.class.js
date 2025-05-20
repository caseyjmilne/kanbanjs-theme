class KanBan {

    tickets       = null;
    statuses      = null;
    statusCols    = [] // Used to track the dropzone elements created from status list.
    dragTicket    = null;

    // Requires tickets, statuses passed.
    constructor( tickets, statuses, resetStorage = null ) {

        // Set local tickets, statuses.

        this.tickets = [...tickets]; // working state
        this.statuses = [...statuses];

        if( resetStorage === null ) {
            this.loadTicketsFromStorage(); // try to restore from previous session
        }
        
        const kbe = document.getElementById('kanban');
        const el1 = document.createElement('div');
        el1.id = "dropzones";
        kbe.appendChild(el1);

        this.init();

    }

    init() {

        this.renderStatusColumns();
        this.renderTickets();

    }

    dragstartHandler(e) {

        // Store the ticket ID that is being dragged.
        e.dataTransfer.setData("text", e.target.id);

        // Add .ticket-dragged class. 
        e.target.classList.add('ticket-dragged');

        this.dragTicket = e.target.id;

    }

    dragoverHandler(e) {

        // Do not allow any action on the ticket dragging over itself.
        if( e.target.classList.contains('ticket-dragged') ) {
            return;
        }

        // Get the index of the ticket hovered over. 
        const ch = e.target.parentElement.children;
        const chArr = Array.from(ch);
        const r = chArr.indexOf( e.target )

        // Verify that the target is the status column.
        const val = e.target.classList[0] === 'status-col';
        if(val) {
            // Enable dropping.
            e.preventDefault();
        }

        // Handle drop on drop spacer.
        const isDropspacer = e.target.classList[0] === 'drop-spacer';
        if(isDropspacer) {
            // Enable dropping.
            e.preventDefault();
        }

        // Verify that the target is a ticket.
        const isTicket = e.target.classList[0] === 'ticket';
        if(isTicket) {

            // Enable dropping.
            e.preventDefault();

            // Remove existing spacer dropzone.
            this.removeSpacerDropzones()

            // Add spacer dropzone before or after ticket.

            const dropSpacerEl = document.createElement('div');
            dropSpacerEl.classList.add('drop-spacer');

            const dropY = e.clientY; // Cursor position while dropping.
            const isDropAbove = this.isDropAbove(dropY, e.target);

            if (isDropAbove) {
                // Insert before
                e.target.parentElement.insertBefore(dropSpacerEl, e.target);
            } else {
                // Insert after
                e.target.parentElement.insertBefore(dropSpacerEl, e.target.nextSibling);
            }
            
        }

    }

    dropHandler(e) {

        e.preventDefault();

        // Get the new status. 
        const newStatus = this.getDropStatus(e.currentTarget);

        const ticketElId = e.dataTransfer.getData("text");
        const ticketEl   = document.getElementById( ticketElId ); 
        const ticketId   = parseInt( ticketEl.getAttribute('ticket-id') );

        // Save change status.
        const ticket = this.tickets.find(t => t.id === ticketId);


        console.log(ticket)

        if (ticket) {
            ticket.status = newStatus;
            this.saveTicketsToStorage();
        }

        // Handle drop on drop spacer.
        const isDropspacer = e.target.classList[0] === 'drop-spacer';
        if(isDropspacer) {

            e.target.parentElement.insertBefore(ticketEl, e.target);
            this.removeSpacerDropzones();
            return;

        }

        // Handle drop on ticket.
        const isTicket = e.target.classList[0] === 'ticket';
        if(isTicket) {

            const dropY = e.clientY; // Cursor position while dropping.
            const isDropAbove = this.isDropAbove(dropY, e.target)

            if (isDropAbove) {
                // Insert before
                e.target.parentElement.insertBefore(ticketEl, e.target);
            } else {
                // Insert after
                e.target.parentElement.insertBefore(ticketEl, e.target.nextSibling);
            }
            
            this.removeSpacerDropzones();
            return;

        }

        // Default behavior when the drop target is the status column ticket is appended to the end.
        e.currentTarget.appendChild( ticketEl );
        this.removeSpacerDropzones();

    }

    dragendHandler(e) {

        const ticketEl = document.getElementById(this.dragTicket);
        ticketEl.classList.remove('ticket-dragged');
        this.removeSpacerDropzones();

    }

    // Determine if the drop is on the upper half of the target ticket.
    isDropAbove(dropY, target) {

        const targetRect = target.getBoundingClientRect();
        const targetMiddleY = targetRect.top + targetRect.height / 2;
        if (dropY < targetMiddleY) {
            return true;
        }
        return false;

    }

    saveTicketsToStorage() {
        localStorage.setItem('kanbanTickets', JSON.stringify(this.tickets));

        console.log('Current Save:')
        console.log(this.tickets)
    }

    loadTicketsFromStorage() {
        const stored = localStorage.getItem('kanbanTickets');
        if (stored) {
            try {
                this.tickets = JSON.parse(stored);
            } catch (e) {
                console.error("Failed to parse saved tickets", e);
            }
        }
    }

    getDropStatus(statusColEl) {
        return statusColEl.getAttribute('status-key');
    }

    // Each status becomes a droppable column.
    renderStatusColumns() {

        
        const dzc = document.getElementById('dropzones');

        this.statuses.forEach( (status, i) => {
            const el = document.createElement('div');
            el.innerHTML = status.title;
            el.id = 'dropzone-' + status.key;
            el.classList.add('status-col');
            el.classList.add('status-col-' + status.key);
            el.setAttribute('status-key', status.key);
            el.addEventListener("dragover", this.dragoverHandler.bind(this));
            el.addEventListener("drop", this.dropHandler.bind(this));
            dzc.appendChild(el);

            // Track the dropzone element to enable ticket insertion.
            this.statusCols[status.key] = el;
        })

    }

    // Each ticket becomes a draggable box.
    renderTickets() {
        
        this.tickets.forEach( (ticket, i) => {
            const el = document.createElement('div');
            el.id = 'ticket-' + ticket.id;
            el.innerHTML = ticket.title;
            el.classList.add('ticket');
            el.draggable = true;
            el.setAttribute('ticket-id', ticket.id);
            el.addEventListener("dragstart", this.dragstartHandler.bind(this));
            el.addEventListener("dragend", this.dragendHandler.bind(this));

            // Append to status column.
            this.statusCols[ticket.status].appendChild(el);
        })

    }

    removeSpacerDropzones() {
        const dropSpacerEls = document.querySelectorAll('.drop-spacer');
        dropSpacerEls.forEach( ( dropSpacerEl, i ) => {
            dropSpacerEl.remove();
        });
    }

}




/****** @TODO 
1. Save kanban ticket changes.
        1A) Save the position of the tickets. 
2. Add spacer before or after ticket during dragover ticket.
        2A) Determine logic for removing the spacer.
            - New spacer is created via dragover.
            - Drop is completed.
            - Dragend without drop. 
            - Hover over element that is not a ticket, like the status list. 

********/


/******
 * 
 * Examples:

onDrop(e) {
    const ticketId = parseInt(draggedEl.dataset.id);
    const newStatus = dropColumn.dataset.status;

    const ticket = this.tickets.find(t => t.id === ticketId);
    if (ticket) {
        ticket.status = newStatus;
        this.saveTicketsToStorage();
    }
}



 * 
 * 
 */