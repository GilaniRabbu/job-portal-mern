import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN', 'USER'],
      default: 'USER',
    },
    userStatus: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'BLOCKED', 'PENDING', 'DELETED'],
      default: 'ACTIVE',
    },
    isDeleted: { type: Boolean },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.index({ userStatus: 1 });
UserSchema.index({ role: 1 });

const User = model('User', UserSchema);

export default User;
