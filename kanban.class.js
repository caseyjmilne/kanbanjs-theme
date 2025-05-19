class KanBan {

    tickets       = null;
    statuses      = null;
    statusCols    = [] // Used to track the dropzone elements created from status list.
    dragTicket    = null;
    ticketShifted = null;

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
            el.addEventListener("dragover", this.dragoverHandler)
            el.addEventListener("drop", this.dropHandler)
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

        console.log(chArr)
        const r = chArr.indexOf( e.target )
        console.log(r)

        // Verify that the target is a dropzone (and not a ticket).
        const val = e.target.classList[0] === 'status-col';
        if(val) {
            // Enable dropping.
            e.preventDefault();
        }

        // Verify that the target is a dropzone (and not a ticket).
        const isTicket = e.target.classList[0] === 'ticket';
        if(isTicket) {

            // Enable dropping.
            e.preventDefault();

            // Shift ticket.
            e.target.classList.add('ticket-shifted');
            this.ticketShifted = e.target.id;
        }

    }

    dropHandler(e) {

        e.preventDefault();
        const ticketId = e.dataTransfer.getData("text");
        const ticketEl = document.getElementById( ticketId ); 

        // Handle drop on ticket.
        const isTicket = e.target.classList[0] === 'ticket';
        if(isTicket) {

            console.log('IS TICKET, APPENDING')

            // Insert before or after the ticket drop target (e.target)
            e.target.parentElement.insertBefore( ticketEl, e.target )
            return;

        }

         
        e.currentTarget.appendChild( ticketEl );

    }

    dragendHandler(e) {

        const ticketEl = document.getElementById(this.dragTicket);
        ticketEl.classList.remove('ticket-dragged');

        // Remove .ticket-shifted from tickets.
        const shiftedTicketEls = document.querySelectorAll('.ticket-shifted');
        shiftedTicketEls.forEach( ( ticketEl, i ) => {
            ticketEl.classList.remove('ticket-shifted')
        })

    }

}




/****** @TODO 

1. Shift ticket when dragover it to enable tickets to be placed in between tickets.
    = During dragover event.
2. Append ticket into list at the correct position when dropped. 
    = During drop event. Requires identifying the index of the nearest ticket(s).
3. Avoid adding ticket-shifted to the ticket being dragged.

********/