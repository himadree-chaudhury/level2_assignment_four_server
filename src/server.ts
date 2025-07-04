import mongoose from "mongoose";
import app from "./app";
import { DB_URL, PORT } from "./config/env";

async function startServer() {
  try {
    await mongoose.connect(DB_URL as string);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
