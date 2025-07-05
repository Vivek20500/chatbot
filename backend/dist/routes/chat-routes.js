import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, sendChatToUser } from "../controllers/chat-controllers.js";
const chatRoutes = Router();
//Protected route to get chat history
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);
chatRoutes.get("/all-chats", verifyToken, sendChatToUser);
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map