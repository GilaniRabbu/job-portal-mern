import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { JobService } from './jobs.service';

const createJob = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id; // set by auth middleware
  const result = await JobService.createJob(req.body, userId);

  console.log(userId);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Job created successfully',
    data: result,
  });
});

const getJobs = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const result = await JobService.getJobs(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Jobs retrieved successfully',
    data: result,
  });
});

const updateJob = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
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
  const userId = req.user.id;
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
  updateJob,
  deleteJob,
};
