import {Router} from "express";
import {fetchFeedback} from "../controllers/feedbackController.js";
const router = Router();

router.get('/',fetchFeedback);

export default router;