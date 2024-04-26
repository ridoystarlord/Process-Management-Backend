import { spawn } from "child_process";

import HttpStatusCode from "http-status-codes";

import { CreateProcessResponseType } from "../Types";
import ApiError from "../Utils/ApiError";

const processes = new Map();

export const createProcess = async (): Promise<CreateProcessResponseType> => {
  const child = spawn("node", [
    "-e",
    `
        const intervalId = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            process.stdout.write(timestamp + "\\n");
        }, 5000);

        process.on('SIGTERM', () => {
            clearInterval(intervalId);
            process.stdout.write('Process terminated at ' + new Date().toLocaleTimeString() + "\\n");
            process.exit(0);
        });
    `,
  ]);

  const creationTime = new Date();
  const logs: string[] = [];
  processes.set(child.pid, { child, logs, creationTime });

  child.stdout.on("data", (data) => {
    console.log(`stdout: PID ${child.pid} - ${data}`);
    logs.push(data.toString().trim()); // Capture each line of output and store it
  });

  child.stderr.on("data", (data) => {
    console.error(`stderr: PID ${child.pid} - ${data}`);
  });

  child.on("close", (code) => {
    console.log(`Child process with PID ${child.pid} exited with code ${code}`);
    processes.delete(child.pid); // Remove the process from the map when it's closed
  });

  return {
    pid: child?.pid as number,
    creationTime: creationTime.toISOString(),
  };
};

export const getAllProcesses = async (): Promise<
  CreateProcessResponseType[]
> => {
  const processList: CreateProcessResponseType[] = [];
  processes.forEach((value, key) => {
    processList.push({
      pid: key,
      creationTime: value.creationTime.toISOString(),
    });
  });
  return processList;
};

export const getProcessByPID = async (pid: number): Promise<string[]> => {
  if (processes.has(pid)) {
    const processInfo = processes.get(pid);
    return processInfo?.logs || [];
  } else {
    throw new ApiError(HttpStatusCode.NOT_FOUND, `Process not found`);
  }
};
export const deleteProcessByPID = async (pid: number): Promise<string> => {
  if (processes.has(pid)) {
    processes.get(pid).child.kill();
    processes.delete(pid);
    return `The ${pid} process has been successfully deleted`;
  } else {
    throw new ApiError(HttpStatusCode.NOT_FOUND, `Process not found`);
  }
};
