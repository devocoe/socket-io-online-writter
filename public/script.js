const socket = io();
const editor = document.getElementById("editor");

const roomId = window.location.pathname.replace("/", "");

socket.emit("join", roomId);

// listening for chages and applying
socket.on("set-changes", (value) => {
  editor.value = value;
});

editor.addEventListener("input", (e) => {
  const { value } = e.target;
  //   emiting changes
  socket.emit("changes", value);
});
