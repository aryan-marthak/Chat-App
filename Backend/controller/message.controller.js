import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async (req, res) => {
    // console.log("message sent", req.params.id, req.body.message);
    try {
        const message = req.body.message;
        const { id: receiverId } = req.params;
        const senderId = req.User._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        res.status(201).json({message: "Message sent successfully ", newMessage});
            
    } catch (error) {
        console.log("Error in sending message: " + error);
        res.status(500).json({ message: "Internal server error" });
    }
} 

export const getMessage = async (req, res) => {
    try {
        const { id: chatuser } = req.params;
        const senderId = req.User._id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatuser] },
        }).populate("messages");
        
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }
        
        const messages = conversation.messages;
        res.status(200).json(messages);
        
    } catch (error) {
        console.log("message getting error " + error);
        res.status(500).json({ message: "Internal server error" });
    }
}