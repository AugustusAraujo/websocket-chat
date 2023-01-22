import { Request, Response } from "express";
import express from "express";
import http from "http";
const socketIO = require("socket.io");
import { Socket } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // exposes /socket.io endpoint!

io.on("connection", (socket: Socket) => {
  console.log("user connected", socket.id);
  socket.emit("status", "conectado");
  socket.on("SEND_MESSAGE", (data) => {
    io.emit("NEW_MESSAGE", { user: socket.id, message: data });
  });
});

app.get("/", (request: Request, response: Response) => {
  response.sendFile(__dirname + "/vue/chat.html");
});

app.get("/login", (request: Request, response: Response) => {
  response.sendFile(__dirname + "/vue/login.html");
});

server.listen(3000, () => {
  console.log("PORT: 3000");
});
