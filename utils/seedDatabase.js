const Service = require('../models/Service');
const SubService = require('../models/SubService');
const Contributor = require('../models/Contributor');
const db = require('../config/database');

const seedDatabase = async () => {
  try {
    await db.sync({ force: true });

    // Create services
    const webDev = await Service.create({
      name: 'Web Development',
      description: 'Full-stack web development services',
      category: 'Development'
    });

    const aiml = await Service.create({
      name: 'AI/ML',
      description: 'Artificial Intelligence and Machine Learning solutions',
      category: 'Development'
    });

    const design = await Service.create({
      name: 'Designing',
      description: 'UI/UX and graphic design services',
      category: 'Design'
    });

    const marketing = await Service.create({
      name: 'Digital Marketing',
      description: 'Full-spectrum digital marketing services',
      category: 'Marketing'
    });

    const seo = await Service.create({
      name: 'SEO',
      description: 'Search Engine Optimization services',
      category: 'Marketing'
    });

    // Create sub-services
    await SubService.bulkCreate([
      // Web Development
      { name: 'Frontend Development', description: 'React, Vue, Angular', estimatedHours: 40, serviceId: webDev.id },
      { name: 'Backend Development', description: 'Node.js, Express, MongoDB', estimatedHours: 50, serviceId: webDev.id },
      { name: 'Database Design', description: 'Schema design and optimization', estimatedHours: 20, serviceId: webDev.id },
      { name: 'API Development', description: 'RESTful & GraphQL APIs', estimatedHours: 30, serviceId: webDev.id },

      // AI/ML
      { name: 'Data Analysis', description: 'Data cleaning and analysis', estimatedHours: 30, serviceId: aiml.id },
      { name: 'Model Training', description: 'Training ML models', estimatedHours: 40, serviceId: aiml.id },
      { name: 'NLP Integration', description: 'Natural Language Processing', estimatedHours: 35, serviceId: aiml.id },

      // Design
      { name: 'UI/UX Design', description: 'User interface and experience design', estimatedHours: 35, serviceId: design.id },
      { name: 'Logo Design', description: 'Brand identity creation', estimatedHours: 15, serviceId: design.id },
      { name: 'Wireframing', description: 'Initial layout design', estimatedHours: 20, serviceId: design.id },

      // Digital Marketing
      { name: 'Social Media Campaign', description: 'Multi-platform social campaigns', estimatedHours: 25, serviceId: marketing.id },
      { name: 'Email Marketing', description: 'Email campaign strategies', estimatedHours: 20, serviceId: marketing.id },
      { name: 'Content Creation', description: 'Blog posts, videos, infographics', estimatedHours: 30, serviceId: marketing.id },

      // SEO
      { name: 'On-page SEO', description: 'Optimizing website content', estimatedHours: 25, serviceId: seo.id },
      { name: 'Off-page SEO', description: 'Backlink building', estimatedHours: 30, serviceId: seo.id },
      { name: 'Technical SEO', description: 'Site performance optimization', estimatedHours: 20, serviceId: seo.id }
    ]);

    // Create contributors
    await Contributor.bulkCreate([
      { name: 'Alex Johnson', role: 'Senior Developer', hourlyRate: 85 },
      { name: 'Sara Chen', role: 'Frontend Developer', hourlyRate: 65 },
      { name: 'Miguel Rodriguez', role: 'Backend Developer', hourlyRate: 70 },
      { name: 'Rachel Kim', role: 'UI/UX Designer', hourlyRate: 75 },
      { name: 'David Smith', role: 'Data Scientist', hourlyRate: 90 },
      { name: 'Lisa Wong', role: 'Marketing Specialist', hourlyRate: 60 },
      { name: 'John Davis', role: 'SEO Expert', hourlyRate: 65 }
    ]);

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

// Execute if this file is run directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
