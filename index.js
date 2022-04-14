const http = require("http");
const path = require("path");
const fs = require("fs");

const host = "localhost";
const port = 3000;

const HTML = "text/html";
const CSS = "text/css";
const JS = "text/javascript";
const JPG = "text/jpg";

const carpeta = path.join(__dirname, "public");

const requestListener = function (req, res) {
  const { url } = req;
  let statusCode = 200;
  let contentType = HTML;
  let stream;

  
  if (url === "/") {
    stream = fs.createReadStream("./public/index.html");

  } else if (url.match(".css$")) {

    contentType = CSS;
    stream = fs.createReadStream(`${carpeta}${url}`);
  }else {
    statusCode = 404;
  }
 
  res.writeHead(statusCode, { "Content-Type": contentType });
  
  if (stream) stream.pipe(res);
  else return res.end("Not found");
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`'app funcionando en el puerto 3000 http://${host}:${port}`);
});