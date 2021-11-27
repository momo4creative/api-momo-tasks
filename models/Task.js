const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [4, "Minimal 4 karakter !"],
      trim: true,
      required: [true, "Judul wajib ada !"],
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("task", taskSchema);
