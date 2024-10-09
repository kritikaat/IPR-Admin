import {Router} from "express";
import {fetchVisitors} from "../controllers/visitorController.js";
const router = Router();

router.get('/', fetchVisitors);

export default router;  