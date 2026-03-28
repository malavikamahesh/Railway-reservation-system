const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'railway_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// Make session data available to all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;
  delete req.session.success;
  delete req.session.error;
  next();
});

// Routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const passengerRoutes = require('./routes/passenger');

app.use('/', authRoutes);
app.use('/admin', adminRoutes);
app.use('/passenger', passengerRoutes);

// Landing page
const pool = require('./config/database');

app.get('/', async (req, res) => {
  try {
    const [trains] = await pool.query('SELECT COUNT(*) as count FROM TRAIN WHERE status = "active"');
    const [stations] = await pool.query('SELECT COUNT(*) as count FROM STATION');
    const [bookings] = await pool.query('SELECT COUNT(*) as count FROM TICKET');
    res.render('index', {
      trainCount: trains[0].count,
      stationCount: stations[0].count,
      bookingCount: bookings[0].count
    });
  } catch (err) {
    res.render('index', { trainCount: 0, stationCount: 0, bookingCount: 0 });
  }
});

// Customer care
app.get('/customer-care', (req, res) => {
  res.render('customer-care');
});

// 404
app.use((req, res) => {
  res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚂 Railway Reservation System running at http://localhost:${PORT}`);
});
