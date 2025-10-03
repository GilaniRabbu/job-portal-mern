"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCreateJobMutation } from "@/redux/api/jobsApi";
import { RootState } from "@/redux/rootReducer";

interface JobForm {
  title: string;
  projectType: string;
  priceRange: string;
  description: string;
  tags: string;
  categories: string;
}

const CreateJobForm = () => {
  const [open, setOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [form, setForm] = useState<JobForm>({
    title: "",
    projectType: "",
    priceRange: "",
    description: "",
    tags: "",
    categories: "",
  });

  const user = useSelector((state: RootState) => state.auth.user); // Get user from Redux
  const [createJob, { isLoading }] = useCreateJobMutation(); // RTK Query mutation hook

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please log in to create a job.");
      return;
    }

    // Prepare payload (convert tags/categories to arrays)
    const payload = {
      ...form,
      tags: form.tags
        ? form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : [],
      categories: form.categories
        ? form.categories
            .split(",")
            .map((cat) => cat.trim())
            .filter(Boolean)
        : [],
    };

    try {
      // Call API to create job
      await createJob(payload).unwrap();
      toast.success("Job created successfully!");
      setOpen(false); // Close dialog
      setForm({
        title: "",
        projectType: "",
        priceRange: "",
        description: "",
        tags: "",
        categories: "",
      }); // Reset form
      setEditingJobId(null); // Clear edit mode
    } catch (error) {
      toast.error("Failed to create job. Please try again.");
      console.error("Create job error:", error);
    }
  };

  return (
    <div className="flex justify-end mb-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setEditingJobId(null);
              setForm({
                title: "",
                projectType: "",
                priceRange: "",
                description: "",
                tags: "",
                categories: "",
              });
            }}
          >
            Create Job
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingJobId ? "Edit Job" : "Create Job"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Job Title"
              required
            />
            <Input
              type="text"
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              placeholder="Project Type"
              required
            />
            <Input
              type="text"
              name="priceRange"
              value={form.priceRange}
              onChange={handleChange}
              placeholder="Price Range"
              required
            />
            <Textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Job Description"
              required
            />
            <Input
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
            />
            <Input
              type="text"
              name="categories"
              value={form.categories}
              onChange={handleChange}
              placeholder="Categories (comma separated)"
            />
            {/* Show postedBy but not editable */}
            <Input
              type="text"
              name="postedBy"
              value={user?.name || ""}
              disabled
            />
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading
                ? "Creating..."
                : editingJobId
                ? "Update Job"
                : "Create Job"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateJobForm;
