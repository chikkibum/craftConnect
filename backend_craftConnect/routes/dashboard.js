import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.js";

const router = Router();

router.get("/data", dashboardController.getDashboardData);

export default router;
