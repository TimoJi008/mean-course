const http = require("http"); // import in node.js
const app = require("./backend/app"); // import the app from the app.js file

const port = process.env.PORT || 3000;

app.set("port", port);
const server = http.createServer(app); // create a server using the app

server.listen(port);
