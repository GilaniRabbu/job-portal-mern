import { Schema, model } from 'mongoose';

const JobSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    projectType: { type: String, required: [true, 'Project type is required'] },
    priceRange: { type: String, required: [true, 'Price range is required'] },
    description: { type: String, required: [true, 'Description is required'] },

    tags: {
      type: [String],
      default: [],
      validate: [Array.isArray, 'Tags must be an array of strings'],
    },
    categories: {
      type: [String],
      default: [],
      validate: [Array.isArray, 'Categories must be an array of strings'],
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator is required'],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for postedBy (user's name)
JobSchema.virtual('postedBy', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true,
  options: { select: 'name' }, // Only fetch name, not full user
});

const Job = model('Job', JobSchema);

export default Job;
