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
    },
    {
        id: 103,
        title: "Buy apartment in Panama.",
        status: "new"
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

const kb = new KanBan( tickets, statuses );