import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import Job from './jobs.model';
import { IPaginationOptions } from '../../../interfaces/paginations'; // Import interface

const createJob = async (payload: any, userId: string): Promise<any> => {
  const job = await Job.create({ ...payload, createdBy: userId });
  await job.populate('createdBy', 'name');
  return job;
};

const getJobs = async (
  userId?: string,
  options: IPaginationOptions = {} // Use typed pagination options
): Promise<{
  jobs: any[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;
  const skip = (page - 1) * limit;

  const filter: any = {};
  if (userId) {
    filter.createdBy = userId;
  }

  // Build sort object
  const sort: any = {};
  sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

  // Parallel queries for efficiency
  const [jobs, total] = await Promise.all([
    Job.find(filter)
      .populate('createdBy', 'name')
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Job.countDocuments(filter),
  ]);

  return {
    jobs,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

const updateJob = async (
  jobId: string,
  userId: string,
  payload: any
): Promise<any> => {
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    payload,
    { new: true }
  ).populate('createdBy', 'name');

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found or unauthorized');
  }

  return job;
};

const deleteJob = async (jobId: string, userId: string): Promise<any> => {
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });

  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found or unauthorized');
  }

  return job;
};

export const JobService = {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
};
