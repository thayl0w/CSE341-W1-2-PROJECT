const express = require('express');
const mongodb = require('./data/database');

const app = express();
const port = process.env.PORT || 3000;

// Middleware (no need for body-parser anymore)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.use('/', require('./routes'));

// Initialize database and start server
mongodb.initDb((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected. Server running on port ${port}`);
    });
  }
});
