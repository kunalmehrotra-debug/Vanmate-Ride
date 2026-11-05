const fs = require('fs');

const html = fs.readFileSync('C:/Users/KUNAL/Downloads/vanmate-modern/frontend/landing.html', 'utf-8');

// Extract colors
const colorsMatch = html.match(/colors:\s*({[^}]+})/);
let css = '@theme {\n';
if (colorsMatch) {
  const colorsStr = colorsMatch[1].replace(/"/g, '"').replace(/\n/g, '').replace(/\r/g, '');
  // It's a JS object, let's eval it securely
  const colors = eval('(' + colorsMatch[1] + ')');
  for (const [k, v] of Object.entries(colors)) {
    css += `  --color-${k}: ${v};\n`;
  }
}

// Extract spacing
const spacingMatch = html.match(/spacing:\s*({[^}]+})/);
if (spacingMatch) {
  const spacing = eval('(' + spacingMatch[1] + ')');
  for (const [k, v] of Object.entries(spacing)) {
    css += `  --spacing-${k}: ${v};\n`;
  }
}

// Add the custom glass classes
css += `
}

@layer utilities {
  .glass-panel {
      @apply bg-white/5 backdrop-blur-xl border border-white/15 shadow-[0_0_20px_rgba(255,255,255,0.05)];
  }
  .glass-panel-hover {
      @apply hover:bg-white/10 transition-all duration-300;
  }
}
`;

fs.appendFileSync('C:/Users/KUNAL/Downloads/vanmate-modern/frontend/src/app/globals.css', '\n' + css);
console.log("Updated globals.css");
