import { RequestHandler, Request, Response } from "express";
import HttpStatusCode from "http-status-codes";

import {
  createProcess,
  deleteProcessByPID,
  getAllProcesses,
  getProcessByPID,
} from "../Service/ProcessService";
import APIResponse from "../Utils/APIResponse";
import catchAsync from "../Utils/catchAsync";

export const CreateProcess: RequestHandler = catchAsync(async (req, res) => {
  const data = await createProcess();

  APIResponse(res, {
    statusCode: HttpStatusCode.OK,
    success: true,
    message: "Process Created Successfully!",
    data: data,
  });
});

export const GetAllProcesses: RequestHandler = catchAsync(async (req, res) => {
  const data = await getAllProcesses();

  APIResponse(res, {
    statusCode: HttpStatusCode.OK,
    success: true,
    message: "Process List Retrieved Successfully!",
    data: data,
  });
});

export const GetProcessByPID: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const pid = parseInt(req.params.pid);
    const data = await getProcessByPID(pid);
    APIResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: "Process Logs Retrieved By PID Successfully!",
      data: data,
    });
  }
);

export const DeleteProcessByPID: RequestHandler = catchAsync(
  async (req, res) => {
    const pid = parseInt(req.params.pid);
    const data = await deleteProcessByPID(pid);

    APIResponse(res, {
      statusCode: HttpStatusCode.OK,
      success: true,
      message: "Process Delete By PID Successfully!",
      data: data,
    });
  }
);
