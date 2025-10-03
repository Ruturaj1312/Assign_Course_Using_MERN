const mongoose = require("mongoose");

const CourseAssignSchma = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
});

const CourseAssign = mongoose.model("course_assign", CourseAssignSchma);

module.exports = CourseAssign;
