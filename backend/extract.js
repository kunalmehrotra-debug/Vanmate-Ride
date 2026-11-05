const fs = require('fs');
const files = [568, 569, 570, 571, 572];
files.forEach(id => {
  const path = `C:/Users/KUNAL/.gemini/antigravity/brain/59570012-b180-4821-b966-8cb4d7ea3218/.system_generated/steps/${id}/output.txt`;
  try {
    const c = fs.readFileSync(path, 'utf-8');
    const m = c.match(/"downloadUrl":"(https:\/\/lh3\.googleusercontent\.com\/[^"]+)"/g);
    if (m) {
      console.log(`File ${id}: ${m[m.length - 1].split('":"')[1].slice(0, -1)}`);
    }
  } catch(e) {}
});
