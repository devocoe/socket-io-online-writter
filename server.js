const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {});
const { v4: uuidV4 } = require("uuid");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:roomId", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  socket.on("join", (roomId) => {
    // joining user to room
    socket.join(roomId);
    // listening for changes
    socket.on("changes", (value) => {
      // emiting changes to users
      socket.to(roomId).emit("set-changes", value);
    });
  });
});

server.listen(8000, () => console.log("listening.."));
