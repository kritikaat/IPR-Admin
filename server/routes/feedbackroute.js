import {Router} from "express";
import {fetchFeedback} from "../controllers/feedbackcontroller.js";
const router = Router();

router.get('/',fetchFeedback);

export default router;