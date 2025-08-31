/* eslint-disable */

import { baseApi } from "./baseApi";

const jobsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Job
    createJob: build.mutation({
      query: (data: any) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // Get All Jobs (for logged-in user)
    getJobs: build.query({
      query: () => ({
        url: "/jobs",
        method: "GET",
      }),
      providesTags: ["Jobs"],
    }),

    // Update Job
    updateJob: build.mutation({
      query: ({ id, ...data }: any) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    // Delete Job
    deleteJob: build.mutation({
      query: (id: string) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Jobs"],
    }),
  }),
});

export const {
  useCreateJobMutation,
  useGetJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;

export default jobsApi;
