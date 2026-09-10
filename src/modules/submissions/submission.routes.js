const express = require("express");
const service = require("./submission.service");
const evaluationService = require("../evaluations/evaluation.service");

const router = express.Router();

// Create and evaluate submission
router.post("/", (req, res) => {
  let submission;

  try {
    submission = service.createSubmission({
      ...req.body,
      status: "pending"
    });

    service.updateSubmissionStatus(submission.id, "pending");

    const feedback = evaluationService.evaluateSubmissionById(
      submission.id
    );

    const completedSubmission = service.updateSubmissionStatus(
      submission.id,
      "completed"
    );

    return res.status(201).json({
      message: "Design submitted successfully",
      submission: completedSubmission,
      feedback
    });
  } catch (error) {
    console.error("Evaluation failed:", error);

    if (submission?.id) {
      service.updateSubmissionStatus(submission.id, "failed");
    }

    return res.status(500).json({
      message: "Evaluation failed",
      submissionId: submission?.id || null,
      status: "failed"
    });
  }
});

// Retry failed submission
router.post("/:id/retry", (req, res) => {
  const submissionId = Number(req.params.id);

  try {
    const submission = service.getSubmissionById(submissionId);

    if (!submission) {
      return res.status(404).json({
        message: "Submission not found"
      });
    }

    service.updateSubmissionStatus(submissionId, "pending");

    const feedback = evaluationService.evaluateSubmissionById(
      submissionId
    );

    const completedSubmission = service.updateSubmissionStatus(
      submissionId,
      "completed"
    );

    return res.json({
      message: "Submission evaluated successfully",
      submission: completedSubmission,
      feedback
    });
  } catch (error) {
    console.error("Retry failed:", error);

    service.updateSubmissionStatus(submissionId, "failed");

    return res.status(500).json({
      message: "Retry evaluation failed",
      submissionId,
      status: "failed"
    });
  }
});

// Get previous attempts for a problem
router.get("/problem/:problemId", (req, res) => {
  try {
    const submissions = service.getSubmissionsByProblemId(
      Number(req.params.problemId)
    );

    res.json(submissions);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load submissions"
    });
  }
});

// Get single submission
router.get("/:id", (req, res) => {
  const submission = service.getSubmissionById(
    Number(req.params.id)
  );

  if (!submission) {
    return res.status(404).json({
      message: "Submission not found"
    });
  }

  res.json(submission);
});

module.exports = router;