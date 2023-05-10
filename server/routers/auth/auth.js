import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../../databases/sqliteConnection.js";

const router = Router();

// Sign-Up:
router.post("/auth/sign-up", async (req, res) => {
    // Check if username is already taken:
    const user = await db.get("SELECT * FROM users WHERE username = ?", [(req.body.username).toLowerCase()]);
    if (user){
        res.status(400).send("Username already exists");
    // If not: 
    } else {
        const password = await bcrypt.hash(req.body.password, 8);
        await db.all("INSERT INTO users (username, email, password, user_type) VALUES (?, ?, ?, 2)", [(req.body.username).toLowerCase(), (req.body.email).toLowerCase(), password]);
        res.status(200).send("User was created!");
    }    
})

// Log-In
router.post("/auth/log-in", async (req, res) => {
    // Search for username:
    const user = await db.get("SELECT * FROM users WHERE username = ?", [(req.body.username).toLowerCase()]);
    if (user){
        // The username exists. Does the password match?
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);
        if (passwordCompare){
            // Do Something
        } else {
            res.status(401).send();
        }
    } else {
        res.send("who are you again?");
    }
})

export default router;
