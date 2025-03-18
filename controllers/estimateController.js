const Estimate = require('../models/Estimate');
const excelGenerator = require('../utils/excelGenerator');

// Get all estimates
exports.getAllEstimates = async (req, res) => {
  try {
    const estimates = await Estimate.findAll();
    res.json(estimates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single estimate
exports.getEstimate = async (req, res) => {
  try {
    const estimate = await Estimate.findByPk(req.params.id);
    if (!estimate) {
      return res.status(404).json({ error: 'Estimate not found' });
    }
    res.json(estimate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new estimate
exports.createEstimate = async (req, res) => {
  try {
    const estimate = await Estimate.create(req.body);
    res.status(201).json(estimate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Export estimate to JSON
exports.exportToJson = async (req, res) => {
  try {
    const estimate = await Estimate.findByPk(req.params.id);
    if (!estimate) {
      return res.status(404).json({ error: 'Estimate not found' });
    }

    res.setHeader('Content-Disposition', `attachment; filename="estimate-${estimate.id}.json"`);
    res.setHeader('Content-Type', 'application/json');
    res.json(estimate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Export estimate to Excel
exports.exportToExcel = async (req, res) => {
  try {
    const estimate = await Estimate.findByPk(req.params.id);
    if (!estimate) {
      return res.status(404).json({ error: 'Estimate not found' });
    }

    const buffer = await excelGenerator.generateExcel(estimate);

    res.setHeader('Content-Disposition', `attachment; filename="estimate-${estimate.id}.xlsx"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


// Render create estimate page
exports.renderCreateEstimate = async (req, res) => {
  try {
    res.render('estimate-builder', {
      title: 'Create Estimate'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render estimates list page
exports.renderEstimatesList = async (req, res) => {
  try {
    const estimates = await Estimate.findAll({
      order: [['createdAt', 'DESC']]
    });

    res.render('estimates', {
      title: 'Your Estimates',
      estimates
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Render single estimate view
exports.renderEstimateView = async (req, res) => {
  try {
    const estimate = await Estimate.findByPk(req.params.id);

    if (!estimate) {
      return res.status(404).render('error', {
        title: 'Not Found',
        message: 'Estimate not found'
      });
    }

    res.render('estimate-view', {
      title: `Estimate: ${estimate.title}`,
      estimate
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};