const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("WebSocket connected!");

  socket.on("message", (message) => {
    console.log(`WebSocket received a message: ${message}`);

    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(`User says: ${message}`);
      }
    });

    socket.send(`You say: ${message}`);
  });

  socket.on("close", () => {
    console.log("WebSocket closed!");
  });
});
