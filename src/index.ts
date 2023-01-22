import { Request, Response } from "express";

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

import { Socket } from "socket.io";
const app = express();
const server = http.createServer(app);
const io = socketIO(server); // exposes /socket.io endpoint!

io.on("connection", (socket: Socket) => {
  console.log("user connected", socket.id);
  socket.emit("status", "conectado");
  socket.on("SEND_MESSAGE", (data) => {
    socket.emit("NEW_MESSAGE", data)
  })
});

app.get("/", (request: Request, response: Response) => {
  response.sendFile(__dirname + "/vue/index.html");
});

app.get("/login", (request: Request, response: Response) => {
  response.sendFile(__dirname + "/vue/login.html");
});

server.listen(3000, () => {
  console.log("PORT: 3000");
});