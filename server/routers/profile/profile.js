import mongoDB from "../../databases/mongoConnection.js";
import { Router } from 'express';
import { isAuthenticated } from "../../helperFunctions/isAuthenticated.js";

const router = Router();

// TODO: make it so a User can change username, password, or email.
// TODO: it would be nice to be able to edit the list of liked songs as well, but that will come later.

export default router;
