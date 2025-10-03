let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");

mongoose.connect("mongodb://localhost:27017/assign_course").then((res) => {
  console.log("Database connect");
});

let app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to node js");
});

app.use("/students", require("./routes/StrudentRoutes"));
app.use("/course", require("./routes/CourseRoute"));
app.use("/course_assign", require("./routes/CourseAssignRoute"));
app.use("/user", require("./routes/userRoute"));

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
