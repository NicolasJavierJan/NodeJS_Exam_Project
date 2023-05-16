// TODO: Basic implementation done, need some work on routes and details.

// In package.json, the "type" is "module". This means I have to import using the word "import" as oposed to "require";
import dotenv from "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import rateLimit from "express-rate-limit";

import { spawn } from "child_process";
import { isAuthenticated } from "./helperFunctions/isAuthenticated.js";

const app = express();

// Routes:
import authRouter from "./routers/auth/auth.js";
import userSongs from "./routers/songs/songs.js";

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

//TODO: add "isAuthenticated";
app.get('/run', (req, res) => {
        //TODO: Delete this console.log
        console.log("i started");
        const pythonProcess = spawn('python', ['../machine_learning/setup.py']);

        let generatedText = '';
        let errorMessage = '';
        let songs = [];

        pythonProcess.stdout.on('data', (data) => {
            const lines = data.toString().replace(/\r/g, '').trim().split('\n');
            console.log(lines);
            songs.push(...lines);
        });
      
        pythonProcess.stderr.on('data', (data) => {
            errorMessage += data.toString();
        });
      
        pythonProcess.on('close', (code) => {
          if (code === 0) {
            console.log("Finished, sending data:")
            // Send the generated text as the response
            res.status(200).send(songs);
          } else {
            // Send the error message as the response
            res.status(500).send(errorMessage);
          }
        });
})

// Using the port from the environmental variables OR port 8080.
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})