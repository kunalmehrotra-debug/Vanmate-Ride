const fs = require('fs');
const html = fs.readFileSync('C:/Users/KUNAL/Downloads/vanmate-modern/frontend/landing.html', 'utf-8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/);
if (bodyMatch) {
  let jsx = bodyMatch[1]
    .replace(/class=/g, 'className=')
    .replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}')
    .replace(/<img([^>]*[^\/])>/g, '<img$1/>') // close img tags just in case
    .replace(/<input([^>]*[^\/])>/g, '<input$1/>')
    .replace(/<br>/g, '<br/>')
    .replace(/<hr>/g, '<hr/>');
    
  fs.writeFileSync('C:/Users/KUNAL/Downloads/vanmate-modern/frontend/landing_body.jsx', jsx);
  console.log("Created landing_body.jsx");
}
