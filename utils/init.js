const db = require('../config/database');
const seedDatabase = require('./seedDatabase');

// Initialize database and seed data
async function init() {
  try {
    console.log('Initializing database...');

    // Authenticate database connection
    await db.authenticate();
    console.log('Database connection established successfully.');

    // Sync models with database
    await db.sync({ force: true });
    console.log('Database models synchronized.');

    // Seed database with initial data
    await seedDatabase();
    console.log('Database seeded successfully.');

    console.log('Application initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing application:', error);
    process.exit(1);
  }
}

// Run initialization
init();
