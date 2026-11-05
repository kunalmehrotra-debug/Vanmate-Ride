const fs = require('fs');
const files = [568, 569, 570, 571, 572];
files.forEach(id => {
  try {
    const c = fs.readFileSync(`C:/Users/KUNAL/.gemini/antigravity/brain/59570012-b180-4821-b966-8cb4d7ea3218/.system_generated/steps/${id}/output.txt`, 'utf-8');
    const htmlRegex = /"htmlCode":\{[^}]+"downloadUrl":"([^"]+)"/;
    const match = c.match(htmlRegex);
    if (match) {
      console.log(`File ${id}: ${match[1]}`);
    } else {
      console.log(`File ${id}: NO HTML LINK`);
    }
  } catch(e) {}
});
