import {Router} from "express";
import { fetchExhibitiondata } from "../controllers/exhibitionController.js";
const router = Router();

router.get('/',fetchExhibitiondata);

export default router;