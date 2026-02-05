const sqlite3 = require('sqlite3').verbose();

// Open (or create) the database
const db = new sqlite3.Database('people.db');

// Create the table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS people (
    request_id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    book_title TEXT NOT NULL,
    reason TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Table created or already exists.');
  }

  // Close the database
  db.close();
});
