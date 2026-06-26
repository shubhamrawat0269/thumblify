import express from "express";
import { getThumbnailById, getUsersThumbnails } from "../controllers/user.controller.js";

const UserRouter = express.Router();

UserRouter.get("/thumbnails", getUsersThumbnails);
UserRouter.delete("/thumbnail/:id", getThumbnailById);

export default UserRouter;
