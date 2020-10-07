require("dotenv").config();
const http = require("http");
const bodyParser = require("body-parser");
const CubejsServerCore = require("@cubejs-backend/server-core");
const WebSocketServer = require("@cubejs-backend/server/WebSocketServer");
const express = require("express");

const app = express();
app.use(require("cors")());
app.use(bodyParser.json({ limit: "50mb" }));

const serverCore = CubejsServerCore.create({
	logger: (msg, params) => {
		console.log(`${msg}: ${JSON.stringify(params)}`);
  },
	checkAuthMiddleware: (req, res, next) => {
    return next && next();
  },
  checkAuth: (req, auth) => {} 
});

serverCore.initApp(app);
const server = http.createServer({}, app);

// Subscriptions thru websockets
const socketServer = new WebSocketServer(serverCore, {
  processSubscriptionsInterval: 1,
});
socketServer.initServer(server);

const port = process.env.PORT || 4000;
server.listen(port, (err) => {
	if (err) {
		console.error("Fatal error during server start: ");
		console.error(e.stack || e);
	}
	console.log(
		`Cube.js server (${CubejsServerCore.version()}) is listening on ${port}`
	);
});
