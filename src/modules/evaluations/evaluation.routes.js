const express = require("express");
const service = require("./evaluation.service");

const router = express.Router();

router.post("/:submissionId", (req, res) => {
  try {
    const feedback = service.evaluateSubmissionById(
      Number(req.params.submissionId)
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    res.status(201).json({
      message: "Evaluation completed",
      feedback
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to evaluate submission"
    });
  }
});

module.exports = router;