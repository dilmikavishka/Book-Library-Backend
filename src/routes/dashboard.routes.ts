import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller";

const dashboardRouter = express.Router();

dashboardRouter.get("/stats", getDashboardStats);

export default dashboardRouter;