const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database('./teachers.db');

// Create the table if it doesn't exist
db.run(
  `CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    domain TEXT,
    experience INTEGER
  )`
);

// POST route to add a new teacher
app.post('/teachers', (req, res) => {
  const { name, domain, experience } = req.body;

  if (!name || !domain || !experience) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const query = `INSERT INTO teachers (name, domain, experience) VALUES (?, ?, ?)`;
  db.run(query, [name, domain, experience], function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error!' });
    }
    res.status(201).json({ id: this.lastID, name, domain, experience });
  });
});

// GET route to fetch all teachers
app.get('/teachers', (req, res) => {
  const query = `SELECT * FROM teachers`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Database error!' });
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
