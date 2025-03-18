const express = require('express');
const router = express.Router();
const estimateController = require('../controllers/estimateController');

router.get('/', estimateController.getAllEstimates);
router.get('/:id', estimateController.getEstimate);
router.post('/', estimateController.createEstimate);
router.get('/:id/export/json', estimateController.exportToJson);
router.get('/:id/export/excel', estimateController.exportToExcel);

module.exports = router;
