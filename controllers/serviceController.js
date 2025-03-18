const Service = require('../models/Service');
const SubService = require('../models/SubService');
const Contributor = require('../models/Contributor');

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({
      include: [{ model: SubService }]
    });
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all contributors
exports.getAllContributors = async (req, res) => {
  try {
    const contributors = await Contributor.findAll();
    res.json(contributors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add new service
exports.addService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add new sub-service
exports.addSubService = async (req, res) => {
  try {
    const subService = await SubService.create(req.body);
    res.status(201).json(subService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Add new contributor
exports.addContributor = async (req, res) => {
  try {
    const contributor = await Contributor.create(req.body);
    res.status(201).json(contributor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
