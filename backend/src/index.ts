import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

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
