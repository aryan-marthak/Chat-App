import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";
const socketContext = createContext();

// it is a hook.
export const useSocketContext = () => {
    return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [authUser] = useAuth();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:4001", {
                query: {
                    userId: authUser.user._id,
                },
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                transports: ['websocket'],
                forceNew: true,
                timeout: 10000
            });

            socket.on("connect", () => {
                console.log("Socket connected");
            });

            socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
            });

            socket.on("disconnect", (reason) => {
                console.log("Socket disconnected:", reason);
            });

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            setSocket(socket);

            return () => {
                if (socket) {
                    socket.off("connect");
                    socket.off("connect_error");
                    socket.off("disconnect");
                    socket.off("getOnlineUsers");
                    socket.close();
                }
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
};