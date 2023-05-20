import { Router } from "express";
import db from "../../databases/sqliteConnection.js";
import { isAdmin } from "../../helperFunctions/isAdmin.js";

const router = Router();

router.get("/admin/userCountries", isAdmin, async (req, res) => {
    const userCountries = await db.all("SELECT country, COUNT(*) AS number FROM profiles GROUP BY country");
    res.status(200).send(userCountries);
})

router.get("/admin/userSongsCreated", isAdmin, async (req, res) => {
    const userSongsCreated = await db.all("SELECT SUM(songs_created) AS number FROM profiles");
    res.status(200).send(userSongsCreated);
})

router.get("/admin/userSongsFavorited", isAdmin, async (req, res) => {
    const userSongsFavorited = await db.all("SELECT SUM(songs_favorited) AS number FROM profiles");
    res.status(200).send(userSongsFavorited);
})

export default router;