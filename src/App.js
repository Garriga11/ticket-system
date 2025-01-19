import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import your styles

function App() {
  const [serialNumber, setSerialNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null); // For ticket submission message

  // Fetch tickets from the backend
  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tickets");
      setTickets(response.data); // Update the tickets list
    } catch (err) {
      setError("This is a simulation. Hardware is needed to send to print server.");
    }
  };

  const createTicket = async () => {
    if (!serialNumber || !notes) {
      alert("Both Serial Number and Notes are required!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/api/tickets", {
        serialNumber,
        notes,
      });
      setTickets([...tickets, response.data]); // Add new ticket to the list
      setSerialNumber(""); // Clear the input fields
      setNotes("");
      setError(null); // Clear any error messages
      setConfirmationMessage("Ticket is submitted!"); // Set the confirmation message

      // Simulate sending to a future print server
      await sendToPrintServer(response.data);
    } catch (err) {
      setError("This is a simulation hardware is needed for remote print server.");
    }
  };

  // Simulate sending to a print server
  const sendToPrintServer = async (ticket) => {
    console.log("Simulating sending ticket to print server:", ticket);
    // Here you could send the ticket to a print server in the future
    // For example:
    // await axios.post("http://unknown-print-server.com/print", ticket);
  };

  const printTicket = (ticket) => {
    const printableContent = `
    <html>
      <head>
        <title>Ticket - ${ticket.serialNumber}</title>
      </head>
      <body>
        <h1>Ticket</h1>
        <p><strong>Serial:</strong> ${ticket.serialNumber}</p>
        <p><strong>Notes:</strong> ${ticket.notes}</p>
      </body>
    </html>
  `;
    const newWindow = window.open("", "_blank"); // Opens a new tab or window
    newWindow.document.write(printableContent); // Writes the ticket details into the new tab
    newWindow.document.close(); // Closes the write stream
    newWindow.print(); // Opens the print dialog
  };




  return (
    <div className="container">
      <h1>Ticketing System</h1>

      <div className="form-container">
        <input
          type="text"
          placeholder="Serial Number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="input-field"
        ></textarea>
        <button onClick={createTicket} className="submit-button">
          Submit
        </button>
      </div>

      {/* Confirmation Message */}
      {confirmationMessage && (
        <p className="confirmation-message">{confirmationMessage}</p>
      )}

      {error && <p className="error-message">{error}</p>}

      <h2>Tickets</h2>
      <ul className="ticket-list">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket-item">
            <strong>Serial:</strong> {ticket.serialNumber}, <strong>Notes:</strong> {ticket.notes}
            <button onClick={() => printTicket(ticket)} className="print-button">
              Print
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

