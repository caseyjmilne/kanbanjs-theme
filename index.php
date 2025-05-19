<div id="kanban"></div>

<style>

.status-col {
    border: solid 1px rgb(200, 200, 200);
    min-height: 500px;
}

.ticket {
    border: solid 1px rgb(180, 180, 180);
    height: 120px;
    background-color: rgb(240, 240, 240);
}

#dropzones {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
}

.dropzone {
    background-color: green;
    min-height: 500px;
}

.ticket-shifted {
    margin-top: 50px;
}

.ticket-dragged {
    opacity: 0.2;
}

</style>

<script>

/****** Data Setup ********/

// Tickets.
const tickets = [
    {
        id: 100,
        title: "Take out trash",
        status: "new"
    },
    {
        id: 101,
        title: "Shop for running shoes",
        status: "new"
    },
    {
        id: 102,
        title: "Workout at Creekside",
        status: "active"
    }
]

// Statuses.
statuses = [
    {
        key: "new",
        title: "New"
    },
    {
        key: "active",
        title: "Active"
    },
    {
        key: "done",
        title: "Done"
    }
]

/****** KanBan Class ********/

class KanBan {

    tickets       = null;
    statuses      = null;
    statusCols    = [] // Used to track the dropzone elements created from status list.
    dragTicket    = null;
    ticketShifted = null;

    constructor() {

        const kbe = document.getElementById('kanban');
        const el1 = document.createElement('div');
        el1.id = "dropzones";
        kbe.appendChild(el1);

        this.init();

    }

    init() {

        this.tickets  = tickets;
        this.statuses = statuses;

        // Each ticket becomes a draggable box.
        // Put the ticket in the correct KanBan list according to the status.

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

        // Each ticket becomes a draggable.
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

        // Verify that the target is a dropzone (and not a ticket).
        const val = e.target.classList[0] === 'status-col';
        if(val) {
            // Enable dropping.
            e.preventDefault();
        }

        // Verify that the target is a dropzone (and not a ticket).
        const isTicket = e.target.classList[0] === 'ticket';
        if(isTicket) {


            console.log('setting shifted ticket to ' + e.target.id)

            // Shift ticket.
            e.target.classList.add('ticket-shifted');
            this.ticketShifted = e.target.id;
        }

    }

    dropHandler(e) {

        e.preventDefault();
        const ticketId = e.dataTransfer.getData("text");
        const ticketEl = document.getElementById( ticketId );  
        e.target.appendChild( ticketEl );
    }

    dragendHandler(e) {

        const ticketEl = document.getElementById(this.dragTicket);
        ticketEl.classList.remove('ticket-dragged');

        // Remove .ticket-shifted from tickets.
        const shiftedTicketEls = document.querySelectorAll('.ticket-shifted');

        console.log(shiftedTicketEls)

        shiftedTicketEls.forEach( ( ticketEl, i ) => {
            ticketEl.classList.remove('ticket-shifted')

            console.log(ticketEl)

        })

    }

    test() {



    }

}

/****** Run KanBan ********/

const kb = new KanBan();
kb.test();



/****** @TODO 

1. Shift ticket when dragover it to enable tickets to be placed in between tickets.
    = During dragover event.
2. Append ticket into list at the correct position when dropped. 
    = During drop event. Requires identifying the index of the nearest ticket(s).
3. Avoid adding ticket-shifted to the ticket being dragged.

********/

</script>




