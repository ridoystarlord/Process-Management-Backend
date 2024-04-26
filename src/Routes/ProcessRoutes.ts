import { Router } from "express";

import {
  CreateProcess,
  DeleteProcessByPID,
  GetAllProcesses,
  GetProcessByPID,
} from "../Controllers/ProcessControllers";

const router = Router();

router.get("/", GetAllProcesses);
router.get("/:pid", GetProcessByPID);
router.post("/new", CreateProcess);
router.delete("/:pid", DeleteProcessByPID);

export default router;
