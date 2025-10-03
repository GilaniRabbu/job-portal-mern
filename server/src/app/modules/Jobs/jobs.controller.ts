import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { JobService } from './jobs.service';
import { paginationHelpers } from '../../../helpars/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/paginations';

const createJob = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const result = await JobService.createJob(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Job created successfully',
    data: result,
  });
});

const getJobs = catchAsync(async (req: Request, res: Response) => {
  const authUserId = (req.user as any).id;
  const filterUserId = req.query.userId as string;
  const userId = filterUserId || authUserId;

  // Parse pagination params
  const paginationOptions: IPaginationOptions = {
    page: parseInt(req.query.page as string),
    limit: parseInt(req.query.limit as string),
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as 'asc' | 'desc',
  };
  const pagination = paginationHelpers.calculatePagination(paginationOptions);

  // Cast sortOrder to match IPaginationOptions
  const typedPagination: IPaginationOptions = {
    ...pagination,
    sortOrder: pagination.sortOrder as 'asc' | 'desc', // Safe: helper ensures 'asc' or 'desc'
  };

  const result = await JobService.getJobs(userId, typedPagination);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs retrieved successfully',
    data: result,
  });
});

const getAllJobs = catchAsync(async (req: Request, res: Response) => {
  // Parse pagination params
  const paginationOptions: IPaginationOptions = {
    page: parseInt(req.query.page as string),
    limit: parseInt(req.query.limit as string),
    sortBy: req.query.sortBy as string,
    sortOrder: req.query.sortOrder as 'asc' | 'desc',
  };
  const pagination = paginationHelpers.calculatePagination(paginationOptions);

  // Cast sortOrder to match IPaginationOptions
  const typedPagination: IPaginationOptions = {
    ...pagination,
    sortOrder: pagination.sortOrder as 'asc' | 'desc', // Safe: helper ensures 'asc' or 'desc'
  };

  const result = await JobService.getJobs(undefined, typedPagination);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All jobs retrieved successfully',
    data: result,
  });
});

const updateJob = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const jobId = req.params.id;
  const result = await JobService.updateJob(jobId, userId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job updated successfully',
    data: result,
  });
});

const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const userId = (req.user as any).id;
  const jobId = req.params.id;
  await JobService.deleteJob(jobId, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job deleted successfully',
    data: null,
  });
});

export const JobController = {
  createJob,
  getJobs,
  getAllJobs,
  updateJob,
  deleteJob,
};
