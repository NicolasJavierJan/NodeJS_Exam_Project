// TODO: Basic implementation done, need some work on routes and details.

// In package.json, the "type" is "module". This means I have to import using the word "import" as oposed to "require";
import dotenv from "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import rateLimit from "express-rate-limit";
import http from 'http';
import mongoDB from "./databases/mongoConnection.js";
import db from "./databases/sqliteConnection.js";

import { spawn } from "child_process";
import { isAuthenticated } from "./helperFunctions/isAuthenticated.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["*"]
  }
});

// Routes:
import authRouter from "./routers/auth/auth.js";
import userSongs from "./routers/songs/songs.js";
import profile from "./routers/profile/profile.js";
import adminRouter from "./routers/admin/admin.js";

// Middleware functions:
app.use(express.json());
app.use(helmet());
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use("/auth", rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  // TODO:
  // Make this number smaller before turning the project in!
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

app.use(authRouter);
app.use(userSongs);
app.use(profile);
app.use(adminRouter);

app.get('/run', isAuthenticated, (req, res) => {
        const pythonProcess = spawn('python', ['../machine_learning/setup.py']);

        let errorMessage = '';
        let songs = [];

        pythonProcess.stdout.on('data', (data) => {
            const lines = data.toString().replace(/\r/g, '').trim().split('\n');
            songs.push(...lines);
        });
      
        pythonProcess.stderr.on('data', (data) => {
            errorMessage += data.toString();
        });
      
        pythonProcess.on('close', async (code) => {
          if (code === 0) {
            // Send the generated text as the response
            // Add the songs created to the user profile table:
            await db.run("UPDATE profiles SET songs_created = songs_created + ? WHERE id = ?", [songs.length, req.session.userId]);
            res.status(200).send(songs);
          } else {
            // Send the error message as the response
            res.status(500).send(errorMessage);
          }
        });
})

io.on("connection", (socket) => {  
  socket.on("give me the songs", async () => {
    const collection = mongoDB.collection("favourites");
    const favouriteSongs = await collection.find().toArray();
    io.emit("songs", favouriteSongs);
  })
})

// Using the port from the environmental variables OR port 8080.
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})