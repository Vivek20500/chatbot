import User from "../models/user.js";
import { GoogleGenAI } from "@google/genai";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const chats = user.chats.map(({ role, content }) => ({
        role,
        parts: [{ text: content }],
    }));
    chats.push({ role: "user", parts: [{ text: message }] });
    user.chats.push({ content: message, role: "user" });
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey });
    try {
        // ✅ Added await here
        const chat = await ai.chats.create({
            model: "gemini-2.5-flash",
            history: chats,
        });
        const result = await chat.sendMessage({ message });
        const reply = result.text;
        user.chats.push({ content: reply, role: "model" });
        await user.save();
        return res.status(200).json({ reply });
    }
    catch (error) {
        console.error("Gemini error:", error);
        return res.status(500).json({ error: "Failed to get response from Gemini." });
    }
};
// export const sendChatToUser = async (req,res,next) => {
//     //user login
//     try {
//         const user=await User.findOne({email:res.locals.jwtData.email});
//         if (!user) {
//             return res.status(401).json({message:"Token malfunctioned"});
//         }
//         if (user._id.toString() !== res.locals.jwtData.id) {
//             return res.status(401).json({message:"Token does not match user"});
//         }
//         return res.status(200).json({message:"OK",chats:user.chats});
//     } catch (error) {
//         console.error("Error fetching users:", error);
//         return res.status(200).json({message:"Error",cause:error.message});
//     }
// }
export const sendChatToUser = async (req, res) => {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ chats: user.chats });
};
//# sourceMappingURL=chat-controllers.js.map