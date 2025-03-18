const ExcelJS = require('exceljs');

exports.generateExcel = async (estimate) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Estimate');

  // Add header
  worksheet.mergeCells('A1:F1');
  const titleCell = worksheet.getCell('A1');
  titleCell.value = estimate.title;
  titleCell.font = {
    size: 16,
    bold: true
  };
  titleCell.alignment = { horizontal: 'center' };

  // Add client info
  worksheet.getCell('A3').value = 'Client:';
  worksheet.getCell('B3').value = estimate.clientName;
  worksheet.getCell('A4').value = 'Date:';
  worksheet.getCell('B4').value = new Date(estimate.createdAt).toLocaleDateString();

  // Add description
  if (estimate.description) {
    worksheet.getCell('A6').value = 'Description:';
    worksheet.mergeCells('A7:F7');
    worksheet.getCell('A7').value = estimate.description;
  }

  // Add headers for items
  const headerRow = worksheet.addRow([
    'Service',
    'Sub-Service',
    'Contributor',
    'Hours',
    'Rate ($/hr)',
    'Amount ($)'
  ]);
  headerRow.font = { bold: true };

  // Add items
  const items = estimate.items;
  let totalAmount = 0;

  items.forEach(item => {
    const amount = item.hours * item.rate;
    totalAmount += amount;

    worksheet.addRow([
      item.service,
      item.subService,
      item.contributor,
      item.hours,
      item.rate,
      amount
    ]);
  });

  // Add total
  const totalRow = worksheet.addRow(['', '', '', '', 'Total:', totalAmount]);
  totalRow.font = { bold: true };

  // Format columns
  worksheet.columns.forEach(column => {
    column.width = 15;
  });

  // Generate buffer
  return await workbook.xlsx.writeBuffer();
};
