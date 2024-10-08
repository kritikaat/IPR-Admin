// ratingsRoute.js
import { Router } from "express";
import { fetchRatings } from "../controllers/ratingController.js"; // Ensure the import path is correct

const router = Router();

// Define the route for fetching ratings
router.get('/', fetchRatings);

export default router;
