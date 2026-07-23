// utils/helpers.js
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99, 102, 241';
}

export function generateSessionId() {
  return crypto.randomUUID();
}

export function getCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

export function markdownToHtml(rawText) {
  const lines = rawText.split("\n");
  let htmlResult = "";
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (!line) {
      if (inList) {
        htmlResult += "</ul>";
        inList = false;
      }
      continue;
    }
    line = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    const isBullet = line.startsWith("* ") || line.startsWith("- ");
    if (isBullet) {
      const cleanLineContent = line.replace(/^[\*\-]\s+/, "");
      if (!inList) {
        htmlResult += '<ul>';
        inList = true;
      }
      htmlResult += `<li>${cleanLineContent}</li>`;
    } else {
      if (inList) {
        htmlResult += "</ul>";
        inList = false;
      }
      if (line.startsWith("### ")) {
        const cleanHeading = line.replace(/^###\s+/, "");
        htmlResult += `<h4>${cleanHeading}</h4>`;
      } else {
        htmlResult += `<p>${line}</p>`;
      }
    }
  }
  if (inList) {
    htmlResult += "</ul>";
  }
  return htmlResult;
}