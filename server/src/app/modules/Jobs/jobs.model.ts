import { Schema, model } from 'mongoose';

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    projectType: { type: String, required: true },
    priceRange: { type: String, required: true },
    description: { type: String, required: true },

    tags: { type: [String], default: [] },
    categories: { type: [String], default: [] },

    postedBy: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Job = model('Job', JobSchema);

export default Job;
