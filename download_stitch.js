const fs = require('fs');
const https = require('https');

const url = "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE3MjU0MzFkNDZmMTQxNTg5YjUyNTUzNWI3OTYyMjZhEgsSBxDk5tG5hwoYAZIBIwoKcHJvamVjdF9pZBIVQhMxMjczMDg0OTM5Nzg0NDUxODMx&filename=&opi=96797242";

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    fs.writeFileSync('stitch_design.html', data);
    console.log("Downloaded raw HTML");
  });
}).on('error', (err) => {
  console.error("Error: " + err.message);
});
