document.addEventListener('DOMContentLoaded', () => {
  // Add cybernetic design elements
  addCyberneticElements();

  // Initialize any relevant event listeners
  initializeEventListeners();
});

function addCyberneticElements() {
  // Add scan lines effect to the body
  const scanLines = document.createElement('div');
  scanLines.classList.add('scan-lines');
  document.body.appendChild(scanLines);

  // Add glow effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    const glowEffect = document.createElement('span');
    glowEffect.classList.add('btn-glow');
    button.appendChild(glowEffect);
  });

  // Add data visualization elements to the hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    for (let i = 0; i < 5; i++) {
      const dataLine = document.createElement('div');
      dataLine.classList.add('data-line');
      dataLine.style.left = `${Math.random() * 100}%`;
      dataLine.style.animationDelay = `${Math.random() * 2}s`;
      hero.appendChild(dataLine);
    }
  }
}

function initializeEventListeners() {
  // Toggle mobile menu
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
      const mainNav = document.querySelector('.main-nav');
      mainNav.classList.toggle('active');
    });
  }

  // Format currency inputs
  const currencyInputs = document.querySelectorAll('.currency-input');
  currencyInputs.forEach(input => {
    input.addEventListener('blur', () => {
      const value = parseFloat(input.value.replace(/[^\d.-]/g, ''));
      if (!isNaN(value)) {
        input.value = value.toFixed(2);
      }
    });
  });

  // Preview estimate button
  const previewBtn = document.getElementById('previewBtn');
  if (previewBtn) {
    previewBtn.addEventListener('click', previewEstimate);
  }
}

function previewEstimate() {
  // Collect form data
  const title = document.getElementById('title').value;
  const clientName = document.getElementById('clientName').value;
  const items = [];

  // Get all service items
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach((item, index) => {
    const serviceSelect = document.getElementById(`service-${index}`);
    const subServiceSelect = document.getElementById(`subService-${index}`);
    const contributorSelect = document.getElementById(`contributor-${index}`);
    const hoursInput = document.getElementById(`hours-${index}`);
    const rateInput = document.getElementById(`rate-${index}`);

    if (serviceSelect && serviceSelect.value) {
      const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
      const subServiceName = subServiceSelect.options[subServiceSelect.selectedIndex].text;
      const contributorName = contributorSelect.options[contributorSelect.selectedIndex].text;
      const hours = parseFloat(hoursInput.value) || 0;
      const rate = parseFloat(rateInput.value) || 0;

      items.push({
        service: serviceName,
        subService: subServiceName,
        contributor: contributorName,
        hours,
        rate,
        amount: hours * rate
      });
    }
  });

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  // Create modal for preview
  const modal = document.createElement('div');
  modal.classList.add('preview-modal');

  const modalContent = document.createElement('div');
  modalContent.classList.add('preview-modal-content');

  modalContent.innerHTML = `
    <span class="close-modal">×</span>
    <h2>Estimate Preview: ${title}</h2>
    <div class="preview-client">Client: ${clientName}</div>
    <table class="preview-table">
      <thead>
        <tr>
          <th>Service</th>
          <th>Sub-Service</th>
          <th>Contributor</th>
          <th>Hours</th>
          <th>Rate ($/hr)</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(item => `
          <tr>
            <td>${item.service}</td>
            <td>${item.subService}</td>
            <td>${item.contributor}</td>
            <td>${item.hours}</td>
            <td>$${item.rate.toFixed(2)}</td>
            <td>$${item.amount.toFixed(2)}</td>
          </tr>
        `).join('')}
        <tr class="total-row">
          <td colspan="4"></td>
          <td>Total:</td>
          <td>$${total.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
    <div class="preview-actions">
      <button class="btn btn-secondary close-preview">Close</button>
      <button class="btn btn-primary submit-estimate">Create Estimate</button>
    </div>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Add event listeners for modal
  const closeModal = document.querySelector('.close-modal');
  const closePreview = document.querySelector('.close-preview');
  const submitEstimate = document.querySelector('.submit-estimate');

  closeModal.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  closePreview.addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  submitEstimate.addEventListener('click', () => {
    document.getElementById('estimateForm').submit();
    document.body.removeChild(modal);
  });
}
