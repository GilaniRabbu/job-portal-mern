import { Schema, model } from 'mongoose';

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    projectType: { type: String, required: true }, // e.g. Fixed Price Project
    priceRange: { type: String, required: true }, // e.g. $1,200-$1,400
    description: { type: String, required: true },

    tags: { type: [String], default: [] }, // e.g. ["Remote", "Senior level"]
    categories: { type: [String], default: [] }, // e.g. ["App Design", "UI/UX"]

    postedBy: { type: String, required: true }, // e.g. Eamman Olio (or could be a ref to User later)
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Owner user
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Job = model('Job', JobSchema);

export default Job;
