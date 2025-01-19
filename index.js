const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const path = require('path');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle any other routes (SPA fallback)


let tickets = []; // Temporary storage for tickets

// Route to create a ticket



// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle any other routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Handle any other routes (SPA fallback)

app.post("/api/tickets", (req, res) => {
    const { serialNumber, notes } = req.body;
    if (!serialNumber || !notes) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const ticket = { id: Date.now(), serialNumber, notes };
    tickets.push(ticket);
    res.status(201).json(ticket);
});

// Route to fetch tickets
app.get("/api/tickets", (req, res) => {
    res.json(tickets);
});

// Route to send ticket to print server (simulated)
app.post("/api/print", (req, res) => {
    const { ticketId } = req.body;
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) {
        return res.status(404).json({ error: "Ticket not found." });
    }
    console.log("Simulating ticket sent to print server:", ticket);
    // Respond with the created ticket and a confirmation message
    res.status(201).json({ ticket, message: "Ticket is submitted and sent to the print server!" });


    console.log(`Printing ticket: ${JSON.stringify(ticket)}`);
    res.status(200).json({ message: "Ticket sent to printer." });
});

app.post("/api/tickets", (req, res) => {
    const { serialNumber, notes } = req.body;
    if (!serialNumber || !notes) {
        return res.status(400).json({ error: "Serial number and notes are required." });
    }

    const ticket = { id: Date.now(), serialNumber, notes };
    tickets.push(ticket);

    // Simulate sending to a print server
    console.log("Simulating ticket sent to print server:", ticket);

    // Respond with the created ticket and a confirmation message
    res.status(201).json({ ticket, message: "Ticket is submitted and sent to the print server!" });
});



app.listen(5000, () => console.log('Server is running'));