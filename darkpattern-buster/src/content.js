const PATTERNS = {
  confirmshame: /(no thanks, I hate|no, I prefer paying full|I'll pass on saving|skip discount|I don't want free)/i,
  sneakyCheckboxes: /(subscription|monthly|protect|insurance|tip|donation|auto-renew|newsletter|warranty)/i
};

function runDetectionScan() {
  const findings = [];

  // 1. Scan for sneaky pre-checked checkboxes/radios
  const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
  checkedBoxes.forEach((box, index) => {
    const contextText = box.labels?.[0]?.innerText || box.parentElement?.innerText || '';
    if (PATTERNS.sneakyCheckboxes.test(contextText)) {
      box.style.outline = '3px solid #ef4444';
      box.style.outlineOffset = '2px';

      findings.push({
        id: `chk-${index}`,
        type: 'SNEAKY_CHECKBOX',
        label: 'Sneaky Preselection',
        details: contextText.trim().slice(0, 70) || 'Pre-checked optional charge',
        severity: 'high'
      });
    }
  });

  // 2. Scan for confirmshaming clickable elements
  const clickables = document.querySelectorAll('button, a, [role="button"]');
  clickables.forEach((btn, index) => {
    const text = btn.innerText?.trim() || '';
    if (PATTERNS.confirmshame.test(text)) {
      btn.style.outline = '3px dashed #ef4444';
      btn.style.outlineOffset = '2px';

      findings.push({
        id: `btn-${index}`,
        type: 'CONFIRMSHAMING',
        label: 'Confirmshaming Copy',
        details: text.slice(0, 70),
        severity: 'medium'
      });
    }
  });

  // Calculate score (Cap at 100)
  const score = Math.min(
    100,
    (findings.filter(f => f.severity === 'high').length * 35) +
    (findings.filter(f => f.severity === 'medium').length * 15)
  );

  // Store data for the extension popup UI
  if (chrome.storage?.local) {
    chrome.storage.local.set({
      deceptionScore: score,
      currentUrl: window.location.hostname || 'Local Test Page',
      findings: findings
    });
  }
}

// Execute on initial page load
window.addEventListener('load', runDetectionScan);

// Re-scan dynamically if the page loads content asynchronously
const observer = new MutationObserver(() => runDetectionScan());
observer.observe(document.body, { childList: true, subtree: true });