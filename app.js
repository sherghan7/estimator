const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Service = require('./models/Service');
const SubService = require('./models/SubService');
const Contributor = require('./models/Contributor');
const Estimate = require('./models/Estimate');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Database connection
const db = require('./config/database');

// Database initialization function
const initializeDatabase = async () => {
  try {
    // Test database connection
    await db.authenticate();
    console.log('Database connected successfully...');

    // Sync all models with the database
    // Use {force: true} only in development to drop tables and recreate
    await db.sync({ alter: true });
    console.log('Database synchronized successfully...');

    return true;
  } catch (err) {
    console.error('Error initializing database:', err);
    return false;
  }
};

// Test database connection
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Routes
const estimateRoutes = require('./routes/estimateRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

app.use('/api/estimates', estimateRoutes);
app.use('/api/services', serviceRoutes);

// Add these routes after initializing the API routes

// Import estimate controller
const estimateController = require('./controllers/estimateController');

// View routes
app.get('/create-estimate', estimateController.renderCreateEstimate);
app.get('/estimates', estimateController.renderEstimatesList);
app.get('/estimates/:id', estimateController.renderEstimateView);


// Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Project Estimator'
  });
});

// Start server
const startServer = async () => {
  const dbInitialized = await initializeDatabase();

  if (dbInitialized) {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } else {
    console.error('Failed to start server due to database initialization error');
  }
};

// Call the startup function
startServer();
