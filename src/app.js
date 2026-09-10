const express = require("express");
const cors = require("cors");

const problemRoutes = require("./modules/problems/problem.routes");
const submissionRoutes = require("./modules/submissions/submission.routes");
const evaluationRoutes = require("./modules/evaluations/evaluation.routes");


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/evaluations", evaluationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "LLD Practice Platform API is running"
  });
});

app.use("/api/problems", problemRoutes);
app.use("/api/submissions", submissionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});