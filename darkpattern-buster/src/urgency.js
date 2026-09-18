/**
 * Detects countdown timers and fake urgency patterns in the DOM.
 */
export function detectUrgencyTimers() {
  const findings = [];

  // Regex to detect time patterns like 04:59 or 01:23:45
  const timeRegex = /\b\d{1,2}:\d{2}(:\d{2})?\b/;

  const candidateNodes = document.querySelectorAll('span, div, p, strong, b, em');

  candidateNodes.forEach((node, index) => {
    // Only check leaf elements (nodes with no child HTML tags)
    if (node.children.length === 0 && timeRegex.test(node.innerText)) {
      // Draw an amber outline around the suspicious timer
      node.style.outline = '3px dashed #f59e0b';
      node.style.outlineOffset = '2px';

      findings.push({
        id: `timer-${index}`,
        type: 'FAKE_URGENCY',
        label: 'Artificial Urgency Timer',
        details: `Active timer detected: "${node.innerText.trim()}"`,
        severity: 'medium',
        points: 25,
      });
    }
  });

  return findings;
}