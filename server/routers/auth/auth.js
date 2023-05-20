//TODO: The baseline for authentication is done. I need to connect it to the actual page so Auth works and shows stuff based on that.

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
        await db.all("INSERT INTO users (username, password, user_type) VALUES (?, ?, 2)", [(req.body.username).toLowerCase(), password]);
        const user = await db.get("SELECT * FROM users WHERE username = ?", [(req.body.username).toLowerCase()]);
        await db.all("INSERT INTO profiles (id, name, country, age, songs_created, songs_favorited) VALUES (?, ?, ?, 0, 0, 0)", [user.id, "", ""]);
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
            req.session.userId = user.id;
            req.session.username = user.username;
            req.session.userType = user.user_type;
            res.status(200).send();
        } else {
            res.status(401).send();
        }
    } else {
        res.status(401).send();
    }
})

router.get("/auth/log-out", (req, res) => {
    req.session.destroy();
    res.status(200).send();
})

export default router;
