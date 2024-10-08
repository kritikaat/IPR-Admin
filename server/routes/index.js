import { Router } from "express";
import ratingsRoutes from "./ratingRoutes.js";
import feedbackRoutes from "./feedbackroute.js";

const router = Router();

router.use("/feedback", feedbackRoutes);
router.use("/ratings", ratingsRoutes);

 export default router;