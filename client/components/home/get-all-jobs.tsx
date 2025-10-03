/* eslint-disable */
"use client";

import { useState } from "react";
import { useGetAllJobsQuery } from "@/redux/api/jobsApi";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ContainerWrapper from "@/components/common/ContainerWrapper";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function GetAllJobs() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Fixed limit
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isError } = useGetAllJobsQuery({
    page,
    limit,
    sortBy,
    sortOrder,
  });

  const { jobs = [], total = 0, totalPages = 0 } = data || {};

  if (isError) {
    toast.error("Failed to load jobs. Please try again.");
  }

  return (
    <section className="py-10 lg:py-24">
      <ContainerWrapper className="flex flex-col items-center">
        <div className="bg-[#071400] rounded-2xl max-w-5xl w-full p-12 shadow-lg text-white">
          <h1 className="text-2xl font-bold mb-6 text-center">All Jobs</h1>

          {/* Sorting Controls */}
          <div className="flex gap-4 mb-6 justify-center">
            <div>
              <label className="text-sm text-white/70 mr-2">Sort By:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-[#071400] border-white/10 text-white focus:ring-[#05AF2B]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="bg-[#071400] text-white border-white/10">
                  <SelectItem value="createdAt">Created At</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="priceRange">Price Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-white/70 mr-2">Order:</label>
              <Select
                value={sortOrder}
                onValueChange={(value: any) =>
                  setSortOrder(value as "asc" | "desc")
                }
              >
                <SelectTrigger className="w-[120px] bg-[#071400] border-white/10 text-white focus:ring-[#05AF2B]">
                  <SelectValue placeholder="Order" />
                </SelectTrigger>
                <SelectContent className="bg-[#071400] text-white border-white/10">
                  <SelectItem value="desc">Descending</SelectItem>
                  <SelectItem value="asc">Ascending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job List */}
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-[#05AF2B]" />
            </div>
          ) : jobs.length ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="p-6 bg-black/20 rounded-xl border border-white/10"
                >
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-white/70 mt-1">{job.description}</p>
                  <p className="text-sm text-white/50 mt-2">
                    Posted By: {job.postedBy?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-white/50">
                    Type: {job.projectType}
                  </p>
                  <p className="text-sm text-white/50">
                    Price: {job.priceRange}
                  </p>
                  {job.tags?.length > 0 && (
                    <p className="text-sm text-white/50">
                      Tags: {job.tags.join(", ")}
                    </p>
                  )}
                  {job.categories?.length > 0 && (
                    <p className="text-sm text-white/50">
                      Categories: {job.categories.join(", ")}
                    </p>
                  )}
                </div>
              ))}
              <div className="flex justify-between items-center mt-6">
                <Button
                  disabled={page === 1 || isLoading}
                  onClick={() => setPage(page - 1)}
                  className="bg-[#05AF2B] hover:bg-green-600 text-white"
                >
                  Previous
                </Button>
                <p className="text-white/70">
                  Page {page} of {totalPages} (Total Jobs: {total})
                </p>
                <Button
                  disabled={page === totalPages || isLoading}
                  onClick={() => setPage(page + 1)}
                  className="bg-[#05AF2B] hover:bg-green-600 text-white"
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-center text-white/70">No jobs available.</p>
          )}
        </div>
      </ContainerWrapper>
    </section>
  );
}
