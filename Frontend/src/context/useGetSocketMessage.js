import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../statemanage/useConversation.js";
import sound from "../assets/notification.mp3";

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessage } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            const notification = new Audio(sound);
            notification.play();
            if (!messages.some(msg => msg._id === newMessage._id)) {
                setMessage([...messages, newMessage]);
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessage, messages]);
};

export default useGetSocketMessage;