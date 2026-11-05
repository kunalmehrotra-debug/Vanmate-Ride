const fs = require('fs');
const content = fs.readFileSync('frontend/src/app/page.tsx', 'utf8');

// The new footer ends with </footer>
const footerEnd = content.indexOf('</footer>');
if (footerEnd === -1) {
  console.error("Could not find footer end");
  process.exit(1);
}

// Keep everything up to </footer> (inclusive)
let newContent = content.substring(0, footerEnd + '</footer>'.length);

// Add the final closing tags
newContent += '\n    </div>\n  );\n}\n';

fs.writeFileSync('frontend/src/app/page.tsx', newContent);
console.log("Fixed page.tsx");
