/* eslint-disable */

import { baseApi } from "./baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createJob: build.mutation<any, any>({
      query: (data) => ({
        url: "/jobs",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    getJobs: build.query<
      { jobs: any[]; total: number; page: number; totalPages: number },
      {
        userId?: string;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({
        userId,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      }) => ({
        url: userId
          ? `/jobs?userId=${userId}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
          : `/jobs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
      }),
      transformResponse: (response: {
        data?: { jobs: any[]; total: number; page: number; totalPages: number };
      }) => response.data || { jobs: [], total: 0, page: 1, totalPages: 0 },
      providesTags: ["Jobs"],
    }),

    getAllJobs: build.query<
      { jobs: any[]; total: number; page: number; totalPages: number },
      {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "desc",
      }) => ({
        url: `/jobs/all?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        method: "GET",
      }),
      transformResponse: (response: {
        data?: { jobs: any[]; total: number; page: number; totalPages: number };
      }) => response.data || { jobs: [], total: 0, page: 1, totalPages: 0 },
      providesTags: ["Jobs"],
    }),

    updateJob: build.mutation<any, { id: string } & any>({
      query: ({ id, ...data }) => ({
        url: `/jobs/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Jobs"],
    }),

    deleteJob: build.mutation<any, string>({
      query: (id) => ({
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
  useGetAllJobsQuery,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;

export default jobsApi;
