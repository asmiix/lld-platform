// const repository = require("./submission.repository");

// function createSubmission(submission) {
//   return repository.createSubmission(submission);
// }

// function getSubmissionById(id) {
//   return repository.getSubmissionById(id);
// }

// module.exports = {
//   createSubmission,
//   getSubmissionById
// };

const repository = require("./submission.repository");

function createSubmission(submission) {
  return repository.createSubmission(submission);
}

function getSubmissionById(id) {
  return repository.getSubmissionById(id);
}


// NEW

function getSubmissionsByProblemId(problemId) {
  return repository.getSubmissionsByProblemId(problemId);
}


module.exports = {
  createSubmission,
  getSubmissionById,
  getSubmissionsByProblemId
};