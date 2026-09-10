const repository = require("./submission.repository");

function createSubmission(submission) {
  return repository.createSubmission(submission);
}

function getSubmissionById(id) {
  return repository.getSubmissionById(id);
}

function getSubmissionsByProblemId(problemId) {
  return repository.getSubmissionsByProblemId(problemId);
}

function updateSubmissionStatus(id, status) {
  return repository.updateSubmissionStatus(id, status);
}

module.exports = {
  createSubmission,
  getSubmissionById,
  getSubmissionsByProblemId,
  updateSubmissionStatus
};