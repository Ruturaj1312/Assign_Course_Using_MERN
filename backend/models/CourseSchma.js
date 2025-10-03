const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: String, required: false },
  fees: { type: Number, required: true },
});

const Course = mongoose.model("course", CourseSchema);

module.exports = Course;
