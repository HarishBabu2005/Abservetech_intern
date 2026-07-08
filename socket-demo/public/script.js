const socket = io();
socket.on("connect",()=>{
    console.log("connected",socket.id)
})
socket.on("welcome", (message) => {
    console.log(message);
});