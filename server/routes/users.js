import express from "express";

import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin); //post required because data is being sent to the server && signin controller called.
router.post("/signup", signup);

export default router;
