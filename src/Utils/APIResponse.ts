import { Response } from "express";

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};

const APIResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    pagination: data.pagination || null || undefined,
    data: data.data || null || undefined,
  };

  res.status(data.statusCode).json(responseData);
};

export default APIResponse;
