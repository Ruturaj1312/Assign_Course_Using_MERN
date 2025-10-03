const express = require("express");
const mongoose = require("mongoose");

let CourseAssign = require("../models/CourseAssignSchma");

const router = express.Router();
router.use(express.json());

router.post("/", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const CourseAssignData = await CourseAssign.create({ studentId, courseId });

    res.json({ status: "success", data: CourseAssignData });
  } catch (err) {
    res.json({ status: "error", data: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const StudentCourse = await CourseAssign.find({});

    res.json({ status: "success", data: StudentCourse });
  } catch (err) {
    res.json({ status: "Error", data: err });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    // console.log(studentId);

    const SingleCourse = await CourseAssign.find({ studentId }).populate(
      "courseId"
    );
    const filteredCourses = SingleCourse.filter(
      (entry) => entry.courseId !== null
    );

    res.json({ status: "success", data: filteredCourses });

    res.json({ status: "success", data: SingleCourse });
  } catch (err) {
    res.json({ status: "error", data: err });
  }
});

module.exports = router;
