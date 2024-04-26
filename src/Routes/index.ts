import { Router } from "express";

import ProcessRoutes from "./ProcessRoutes";

const router = Router();

router.use("/process", ProcessRoutes);

export default router;
