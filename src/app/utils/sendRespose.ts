/* eslint-disable @typescript-eslint/no-explicit-any */

interface IMeta{
    total: number;
}

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
  meta?: IMeta;
}

export const sendResponse = <T>(res: any, data: IResponse<T>) => {
res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta,
})};