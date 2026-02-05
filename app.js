const express = require('express'); 
const path = require('path');
const app = express();              
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('people.db');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {        
  res.sendFile(path.join(__dirname,'/pages/index.html'))
});

app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname,'/pages/student.html'))
});

app.get('/staff', (req, res) => {
    res.sendFile(path.join(__dirname,'/pages/staff.html'))
});

app.get('/submit', (req, res) => {
  const name = req.query.name; 

  const query = `
    SELECT * FROM people
    WHERE student_name LIKE ?
  `;

  db.all(query, [`%${name}%`], (err, rows) => {
    if (err) {
      console.error('Search error:', err.message);
      return res.status(500).send('Database error');
    }

    res.json(rows); 
  });
});


app.post('/book-requests', (req, res) => {
  const { student_name, email, book_title, reason } = req.body;

  console.log(req.body); // should now show your form data

  const query = `
    INSERT INTO people (student_name, email, book_title, reason)
    VALUES (?, ?, ?, ?)
  `;

  db.run(query, [student_name, email, book_title, reason], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert data' });
    }

    res.redirect('/student');
  });
});

app.listen(port, () => {            
  console.log(`Server running at http://localhost:${port}`);
})