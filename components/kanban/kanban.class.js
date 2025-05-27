class KanBan {

    tickets       = null;
    statuses      = null;
    statusCols    = [] // Used to track the dropzone elements created from status list.
    dragTicket    = null;
    dropzonesEl   = null;
    container     = null;

    // Requires tickets, statuses passed.
    constructor( container, tickets = [], statuses = [] ) {

        this.container = container;
        this.tickets   = [...tickets];
        this.statuses  = [...statuses];
        this.init();

    }

    setTickets( tickets ) {
        this.tickets = [...tickets];
    }

    getTickets() {
        return this.tickets;
    }

    init() {

        this.dropzonesEl    = document.createElement('div');
        this.dropzonesEl.id = "dropzones";
        this.dropzonesEl.style.gridTemplateColumns = 'repeat(' + this.statuses.length + ', 1fr)';
        this.container.appendChild( this.dropzonesEl );

        this.renderStatusColumns();
        this.renderTickets();

    }

    /*********
     * 
     * Drag and Drop Handler Methods
     *
     */

    dragstartHandler(e) {

        e.dataTransfer.setData("text", e.target.id);
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
            e.preventDefault();
        }

        // Handle drop on drop spacer.
        const isDropspacer = e.target.classList[0] === 'drop-spacer';
        if(isDropspacer) {
            e.preventDefault();
        }

        // Verify that the target is a ticket.
        const isTicket = e.target.classList[0] === 'ticket';
        if(isTicket) {

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

        if (ticket) {
            ticket.status = newStatus;
        }

        // Handle drop on drop spacer.
        const isDropspacer = e.target.classList[0] === 'drop-spacer';
        if(isDropspacer) {

            e.target.parentElement.insertBefore(ticketEl, e.target);
            this.removeSpacerDropzones();

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

        }

        // Default behavior when the drop target is the status column ticket is appended to the end.
        if( !isTicket && !isDropspacer) {
            e.currentTarget.appendChild( ticketEl );
            this.removeSpacerDropzones();
        }

        /* Position Handling */
        this.dropPositionHandler( newStatus, ticket, ticketEl );

    }

    dropPositionHandler( newStatus, ticket, ticketEl ) {

        // Get the ticket elements for the drop column. 
        const statusColumn = this.statusCols[newStatus];
        const ticketEls = Array.from(statusColumn.querySelectorAll('.ticket'));
        const droppedTicketIndex = ticketEls.indexOf(ticketEl);

        const prevTicketEl = ticketEls[droppedTicketIndex - 1] || null;
        const nextTicketEl = ticketEls[droppedTicketIndex+ 1] || null;

        

        const prevTicket = prevTicketEl ? this.tickets.find(t => t.id == prevTicketEl.getAttribute('ticket-id')) : null;
        const nextTicket = nextTicketEl ? this.tickets.find(t => t.id == nextTicketEl.getAttribute('ticket-id')) : null;
        
        // Set new position based on whether there are ticket(s) above and below it.
        let newPosition;
        if (prevTicket && nextTicket) {
            newPosition = (prevTicket.position + nextTicket.position) / 2;
        } else if (prevTicket) {
            newPosition = prevTicket.position + 1;
        } else if (nextTicket) {
            newPosition = nextTicket.position - 1;
        } else {
            newPosition = 0; // only ticket in column
        }

        // Update the ticket position and save to storage.
        ticket.position = newPosition;
        ticketEl.setAttribute('ticket-position', newPosition);

        const ticketPositionEl = ticketEl.querySelector('.ticket-position');
        ticketPositionEl.textContent = ticket.position;

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

    getDropStatus(statusColEl) {
        return statusColEl.getAttribute('status-key');
    }

    /*********
     * 
     * Rendering & Refresh Methods
     *
     */

    // Each status becomes a droppable column.
    renderStatusColumns() {

        const dzc = document.getElementById('dropzones');

        this.statuses.forEach( (status, i) => {
            const el = document.createElement('div');
            el.innerHTML = '<h2>' + status.title + '</h2>';
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

    clearStatusColumns() {
        const dzc = document.getElementById('dropzones');

        // Remove all child elements
        while (dzc.firstChild) {
            dzc.removeChild(dzc.firstChild);
        }

        // Reset tracking object
        this.statusCols = {};
    }

    // Each ticket becomes a draggable box.
    renderTickets() {

        // Sort tickets by position
        const sortedTickets = [...this.tickets].sort((a, b) => a.position - b.position);
        
        sortedTickets.forEach( (ticket, i) => {
            const el = document.createElement('div');
            el.id = 'ticket-' + ticket.id;
            el.innerHTML = `
                <h5 style="font-size: 10px;">` + ticket.id + `</h5>
                <h2 style="font-size: 12px;">` + ticket.title + `</h2>
                <h3 class="ticket-position" style="font-size: 11px;">Position: ` + ticket.position + `</h3>
            `;
            el.classList.add('ticket');
            el.draggable = true;
            el.setAttribute('ticket-id', ticket.id);
            el.setAttribute('ticket-position', ticket.position);
            el.addEventListener("dragstart", this.dragstartHandler.bind(this));
            el.addEventListener("dragend", this.dragendHandler.bind(this));

            // Append to status column.
            this.statusCols[ticket.status].appendChild(el);
        })

    }

    clearTickets() {
        // Loop through each status column and clear its child ticket elements
        Object.values(this.statusCols).forEach(colEl => {
            // Remove only ticket elements
            colEl.querySelectorAll('.ticket').forEach(ticketEl => ticketEl.remove());
        });
    }

    removeSpacerDropzones() {
        const dropSpacerEls = document.querySelectorAll('.drop-spacer');
        dropSpacerEls.forEach( ( dropSpacerEl, i ) => {
            dropSpacerEl.remove();
        });
    }

    normalizePositions() {
        console.log('normalize positions....')
    }

}