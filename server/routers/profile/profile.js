import mongoDB from "../../databases/mongoConnection.js";
import db from "../../databases/sqliteConnection.js";
import { Router } from 'express';
import { isAuthenticated } from "../../helperFunctions/isAuthenticated.js";

const router = Router();

// TODO: make it so a User can change username, password.
router.get("/profile/user", isAuthenticated, async (req, res) => {
    const userInfo = await db.all("SELECT * FROM profiles WHERE id = ?", [req.session.userId]);
    res.status(200).send(userInfo);
})

router.post("/profile/user", isAuthenticated, async (req, res) => {
    await db.run("UPDATE profiles SET name = ?, country = ?, age = ? WHERE id = ?", [req.body.name, req.body.country, req.body.age, req.session.userId]);
    res.status(200).send();
})

export default router;
