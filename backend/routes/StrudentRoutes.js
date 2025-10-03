let express = require("express");
const router = express.Router();

const Student = require("../models/StudentSchma");

router.post("/", async (req, res) => {
  //   console.log(req.body);
  const data = req.body;
  const createdStudent = await Student.create(data);
  res.json({ status: "success", data: createdStudent });
});

router.get("/", async (req, res) => {
  let allStudent = await Student.find()
  res.json({ status: "succuss", data: allStudent });
});

router.get("/:id", async (req, res) => {
  // console.log(req.params.id);
  const studentId = req.params.id;

  const singleStudent = await Student.findById(studentId);

  res.json({ status: "success", data: singleStudent });
});

router.put("/:id", async (req, res) => {
  const studentId = req.params.id;
  const data = req.body;

  const updatedStudent = await Student.findByIdAndUpdate(studentId, data, {
    new: true,
  });

  res.json({ status: "success", data: updatedStudent });
});

router.delete("/:id", async (req, res) => {
  const studentId = req.params.id;
  const deletedStudent = await Student.findByIdAndDelete(studentId);
  res.json({ status: "succuess", data: deletedStudent });
});

module.exports = router;
