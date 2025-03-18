const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/', serviceController.getAllServices);
router.get('/contributors', serviceController.getAllContributors);
router.post('/', serviceController.addService);
router.post('/subservice', serviceController.addSubService);
router.post('/contributor', serviceController.addContributor);

module.exports = router;
