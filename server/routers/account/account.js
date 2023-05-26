import { Router } from "express";
import db from "../../databases/sqliteConnection.js";
import mongoDB from "../../databases/mongoConnection.js";
import bcrypt from "bcrypt";
import { isAuthenticated } from "../../helperFunctions/isAuthenticated.js";

const router = Router();

router.post("/account/user", isAuthenticated, async (req, res) => {
    const id = req.session.userId;
    const password = await bcrypt.hash(req.body.password, 8);
    // Updates users database with new username and password
    await db.run("UPDATE users SET username = ?, password = ? WHERE id = ?", [req.body.username, password, id]);
    // Updates collection in MongoDB database with the new username:
    await mongoDB.renameCollection(req.session.username.toLowerCase(), req.body.username.toLowerCase());
    
    // Destroys the session. A Logout is done in the frontend as well.
    req.session.destroy();
    
    res.status(200).send(); 
});

export default router;