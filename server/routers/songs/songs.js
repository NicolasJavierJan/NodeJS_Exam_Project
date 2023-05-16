import { Router } from "express";
import mongoDB from "../../databases/mongoConnection.js";

import { isAuthenticated } from "../../helperFunctions/isAuthenticated.js";

const router = Router();

//TODO: Check this. It works, but it feels somewhat wobbly.
//TODO: Starting with Profile Page.
router.post("/songs/", isAuthenticated, async (req, res) => {

  const username = req.session.username.toString();
  const dbExists = (await mongoDB.listCollections({ name: username}).toArray()).length;

  if (dbExists){
    const collection = mongoDB.collection(username);
    await collection.updateOne({}, { $push: { songs: { $each: req.body.songs } } });
    console.log(await collection.find().toArray());
  } else {
    mongoDB.createCollection(username);
    const collection = mongoDB.collection(username);
    await collection.insertOne({ songs: req.body.songs } );
    console.log(await collection.find().toArray()); 
  }
})

export default router;