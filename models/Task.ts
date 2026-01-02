import mongoose, { Schema, models } from "mongoose";

const TaskSchema = new Schema(
  {
    taskId: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    selectedDate: {
      type: Date,
      required: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // creates createdAt & updatedAt automatically
  }
);

export const Task = models.Task || mongoose.model("Task", TaskSchema);
