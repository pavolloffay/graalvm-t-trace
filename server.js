const port = 3000;

const http = require("http");
const srv = http.createServer((req, res) => {
  console.log(`server: obtained request ${res.id}`);
  setTimeout(() => {
    res.write(`OK# ${res.id}`);
    console.log(`server: replied to request ${res.id}`);
    res.end();
  }, 5);
});
srv.listen(port);
