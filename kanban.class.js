class KanBan {

    tickets       = null;
    statuses      = null;
    statusCols    = [] // Used to track the dropzone elements created from status list.
    dragTicket    = null;

    // Requires tickets, statuses passed.
    constructor( tickets, statuses ) {

        // Set local tickets, statuses.
        this.tickets  = tickets;
        this.statuses = statuses;

        const kbe = document.getElementById('kanban');
        const el1 = document.createElement('div');
        el1.id = "dropzones";
        kbe.appendChild(el1);

        this.init();

    }

    init() {

        // Each status becomes a droppable column.
        const dzc = document.getElementById('dropzones');
        this.statuses.forEach( (status, i) => {
            const el = document.createElement('div');
            el.innerHTML = status.title;
            el.id = 'dropzone-' + status.key;
            el.classList.add('status-col');
            el.classList.add('status-col-' + status.key);
            el.addEventListener("dragover", this.dragoverHandler.bind(this));
            el.addEventListener("drop", this.dropHandler.bind(this));
            dzc.appendChild(el);

            // Track the dropzone element to enable ticket insertion.
            this.statusCols[status.key] = el;
        })

        // Each ticket becomes a draggable box.
        const tc = document.getElementById('tickets');
        this.tickets.forEach( (ticket, i) => {
            const el = document.createElement('div');
            el.id = 'ticket-' + ticket.id;
            el.innerHTML = ticket.title;
            el.classList.add('ticket');
            el.draggable = true;
            el.addEventListener("dragstart", this.dragstartHandler)
            el.addEventListener("dragend", this.dragendHandler)

            // Append to status column.
            this.statusCols[ticket.status].appendChild(el);
        })


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

        // Verify that the target is a ticket.
        const isTicket = e.target.classList[0] === 'ticket';
        if(isTicket) {

            // Enable dropping.
            e.preventDefault();

            // Remove existing spacer dropzone.
            const dropSpacerEls = document.querySelectorAll('.drop-spacer');
            dropSpacerEls.forEach( ( dropSpacerEl, i ) => {
                dropSpacerEl.remove();
            });

            // Add spacer dropzone before or after ticket.

            const dropSpacerEl = document.createElement('div');
            dropSpacerEl.classList.add('drop-spacer');

            const dropY = e.clientY; // Cursor position while dropping.
            console.log(this)
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
        const ticketId = e.dataTransfer.getData("text");
        const ticketEl = document.getElementById( ticketId ); 

        // Handle drop on drop spacer.
        const isDropspacer = e.target.classList[0] === 'drop-spacer';
        if(isDropspacer) {

            console.log('SPACER DROP')

        }

        // Handle drop on ticket.
        const isTicket = e.target.classList[0] === 'ticket';
        if(isTicket) {

            console.log('IS TICKET, APPENDING')

            const dropY = e.clientY; // Cursor position while dropping.
            const isDropAbove = this.isDropAbove(dropY, e.target)

            if (isDropAbove) {
                // Insert before
                e.target.parentElement.insertBefore(ticketEl, e.target);
            } else {
                // Insert after
                e.target.parentElement.insertBefore(ticketEl, e.target.nextSibling);
            }
            
            return;

        }

        // Default behavior when the drop target is the status column ticket is appended to the end.
        e.currentTarget.appendChild( ticketEl );

    }

    dragendHandler(e) {

        const ticketEl = document.getElementById(this.dragTicket);
        ticketEl.classList.remove('ticket-dragged');

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

}




/****** @TODO 

1. Add spacer before or after ticket during dragover ticket.

********/