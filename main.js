/****** Data Setup ********/

// Tickets.
const tickets = [
    {
        id: 100,
        title: "Take out trash",
        status: "new",
        position: 1
    },
    {
        id: 101,
        title: "Shop for running shoes",
        status: "new",
        position: 2
    },
    {
        id: 102,
        title: "Workout at Creekside",
        status: "active",
        position: 0
    },
    {
        id: 103,
        title: "Buy apartment in Panama.",
        status: "new",
        position: 0
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
        key: "review",
        title: "Review"
    },
    {
        key: "done",
        title: "Done"
    }
]

/****** Run KanBan ********/
const kanbanEl = document.getElementById('kanban');
if( kanbanEl ) {
    const kb = new KanBan( kanbanEl, tickets, statuses );
}
