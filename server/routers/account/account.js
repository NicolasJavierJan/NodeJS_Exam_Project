import { Router } from "express";
import db from "../../databases/sqliteConnection.js";
import bcrypt from "bcrypt";
import { isAuthenticated } from "../../helperFunctions/isAuthenticated.js";

const router = Router();

router.post("/account/user", isAuthenticated, async (req, res) => {
    const id = req.session.userId;
    const password = await bcrypt.hash(req.body.password, 8);
    await db.run("UPDATE users SET username = ?, password = ? WHERE id = ?", [req.body.username, password, id]);
    
    res.status(200).send(); 
});

export default router;