let express = require("express");
const router = express.Router();

const Course = require("../models/CourseSchma");

router.post("/", async (req, res) => {
  // console.log(req.body);
  const data = req.body;
  const createdCourse = await Course.create(data);
  res.json({ status: "success", data: createdCourse });
});

router.get("/", async (req, res) => {
  let allCourse = await Course.find();
  res.json({ status: "succuss", data: allCourse });
});

router.get("/:id", async (req, res) => {
  // console.log(req.params.id);
  const courseId = req.params.id;

  const singleCourse = await Course.findById(courseId);

  res.json({ status: "success", data: singleCourse });
});

router.put("/:id", async (req, res) => {
  const courseId = req.params.id;
  const data = req.body;

  const updatedCourse = await Course.findByIdAndUpdate(courseId, data, {
    new: true,
  });

  res.json({ status: "success", data: updatedCourse });
});

router.delete("/:id", async (req, res) => {
  const courseId = req.params.id;
  const deletedCourse = await Course.findByIdAndDelete(courseId);
  res.json({ status: "succuess", data: deletedCourse });
});

module.exports = router;
