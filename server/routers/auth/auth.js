import { Router } from "express";
import bcrypt from "bcrypt";
import db from "../../databases/sqliteConnection.js";

const router = Router();

// Sign-Up:
router.post("/auth/sign-up", async (req, res) => {
    // Check if username is already taken:
    const user = await db.all("SELECT * FROM users WHERE USERNAME = ?", [req.body.username.toLowerCase()])
    if (user.length !== 0){
        res.send("username taken");
    } else {
        const password = await bcrypt.hash(req.body.password, 8);
        res.send( { username: req.body.username, passowrd: password });
    }    
})

export default router;
