const { Server } = require('socket.io');

module.exports = function (server) {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:8080",
        },
    });

    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if (!username || username.length > 20) {
            return next(new Error("invalid username"));
        }
        socket.username = username;
        next();
    });

    io.on("connection", (socket) => {
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            users.push({
                userID: id,
                username: socket.username,
            });
        }
        socket.emit("users", users);

        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.username,
        });

        socket.on("private message", ({ content, to }) => {
            socket.to(to).emit("private message", {
                content,
                from: socket.id,
            });
        });

        socket.on("disconnect", () => {
            socket.broadcast.emit("user disconnected", socket.id);
        });
    });
};