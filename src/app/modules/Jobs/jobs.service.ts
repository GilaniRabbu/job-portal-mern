import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import Job from './jobs.model';

const createJob = async (payload: any, userId: string): Promise<any> => {
  const job = await Job.create({ ...payload, createdBy: userId });
  return job;
};

const getJobs = async (userId: string): Promise<any[]> => {
  return Job.find({ createdBy: userId });
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
  );

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
