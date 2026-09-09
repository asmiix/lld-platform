// const express = require("express");
// const service = require("./submission.service");
// const evaluationService = require("../evaluations/evaluation.service");

// const router = express.Router();

// router.post("/", (req, res) => {
//   try {
//     const submission = service.createSubmission(req.body);

//     const feedback = evaluationService.evaluateSubmissionById(
//       submission.id
//     );

//     res.status(201).json({
//       message: "Design submitted successfully",
//       submission,
//       feedback
//     });
//   } catch (error) {
//     console.error(error);

//     res.status(500).json({
//       message: "Failed to submit design"
//     });
//   }
// });

// router.get("/:id", (req, res) => {
//   const submission = service.getSubmissionById(
//     Number(req.params.id)
//   );

//   if (!submission) {
//     return res.status(404).json({
//       message: "Submission not found"
//     });
//   }

//   res.json(submission);
// });

// module.exports = router;

const express = require("express");
const service = require("./submission.service");
const evaluationService = require("../evaluations/evaluation.service");

const router = express.Router();


// Create submission

router.post("/", (req, res) => {
  try {
    const submission = service.createSubmission(req.body);

    const feedback = evaluationService.evaluateSubmissionById(
      submission.id
    );

    res.status(201).json({
      message: "Design submitted successfully",
      submission,
      feedback
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to submit design"
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


// NEW: Get previous attempts for a problem

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


module.exports = router;