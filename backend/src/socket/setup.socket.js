import { Server } from "socket.io";

const setupSocket = (server, origins) => {
    const io = new Server(server, {
        origin: origins,
        withCredentials: true,
    });

    return io;
};
