import { Router } from "express";
import mongoDB from "../../databases/mongoConnection.js";

import { isAuthenticated } from "../../helperFunctions/isAuthenticated.js";

const router = Router();

//TODO: Check this. It works, but it feels somewhat wobbly.
router.post("/songs", isAuthenticated, async (req, res) => {
  const username = req.session.username.toString();
  // Checks if there is a collection with that name:
  const dbExists = (await mongoDB.listCollections({ name: username}).toArray()).length;

  // If there is already a collection, it updates the songs.
  if (dbExists){
    //TODO: FIX THIS RIGHT NOW!
    const collection = mongoDB.collection(username);
    await collection.updateOne({}, { 
      $push: { 
        songs: { 
          $each: req.body.songs.map(title => ({ title: title, favorited: false })) 
        } 
      } 
    });
    // If not, creates the collection and saves the songs.
  } else {
    mongoDB.createCollection(username);
    const collection = mongoDB.collection(username);
    const formatted = req.body.songs.map(title => ({
      title: title,
      favorited: false
    }))
    await collection.insertOne({ songs: formatted } ); 
  }
})

router.get("/songs", isAuthenticated, async (req, res) => {
  const collection = mongoDB.collection(req.session.username.toString());
  const favouritedSongs = await collection.find().toArray();
  res.status(200).send(favouritedSongs);
})

// I have to make some stuff:
// And then, edit the frontend so the favorited songs are not available for clicking (again)
router.post("/songs/favourites", isAuthenticated, async (req, res) => {
  const dbExists = (await mongoDB.listCollections({ name: "favourites"}).toArray()).length;
  const userSongsCollection = mongoDB.collection(req.session.username.toString());
  const songTitles = req.body.songs;
  const songsToUpdate = songTitles.map(song => song.title);
  
  // Get the user, songs, and get the titles of the songs to update:
    
  await userSongsCollection.updateMany(
    {},
    { $set: { "songs.$[elem].favorited": true}},
    { arrayFilters: [{ "elem.title": {$in: songsToUpdate }}]}
  );

  if (dbExists){
    const collection = mongoDB.collection("favourites");
    const songsToAdd = req.body.songs.map(song => (song.title))
    await collection.updateOne({}, { $push: { songs: { $each: songsToAdd } } });
    console.log(await collection.find().toArray());
    res.status(200).send();
  } else {    
    mongoDB.createCollection("favourites");
    const collection = mongoDB.collection("favourites");
    const songsToInsert = req.body.songs.map(song => ( song.title ))
    await collection.insertOne({ songs: songsToInsert });
    res.status(200).send();
  }
  
})

export default router;