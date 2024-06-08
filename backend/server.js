import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


import connectToMongoDB from "./db/connecttoMongoDB.js";
import { app, server } from "./socket/socket.js";



// const app=express();//making an instance of the express named app
const PORT=process.env.PORT || 5000;

dotenv.config();
const __dirname = path.resolve();

app.use(express.json()) ;//to parse incoming requests with json payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

//default route
// app.get("/",(req,res)=>{
//     //root route http://localhost:5000/
//     res.send("Hello World");
// });



//server started
server.listen(PORT,()=> {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
