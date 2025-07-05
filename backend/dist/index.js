import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
import cors from 'cors';
const allowedOrigins = [`${process.env.FRONTEND_URL}`];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
// ✅ Optional: Allow preflight requests
app.options("*", cors());
connectToDatabase()
    .then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000 and connected to MongoDB");
    });
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });
//# sourceMappingURL=index.js.map