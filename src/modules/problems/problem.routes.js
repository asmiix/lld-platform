const express = require("express");
const service = require("./problem.service");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(service.getAllProblems());
});

router.get("/:id", (req, res) => {
  const problem = service.getProblemById(Number(req.params.id));

  if (!problem) {
    return res.status(404).json({
      message: "Problem not found"
    });
  }

  res.json(problem);
});

router.post("/", (req, res) => {
  const problem = service.createProblem(req.body);

  res.status(201).json(problem);
});

module.exports = router;