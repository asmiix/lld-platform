const repository = require("./problem.repository");

function getAllProblems() {
  return repository.getAllProblems().map(formatProblem);
}

function getProblemById(id) {
  const problem = repository.getProblemById(id);

  if (!problem) {
    return null;
  }

  return formatProblem(problem);
}

function createProblem(problem) {
  return formatProblem(repository.createProblem(problem));
}

function formatProblem(problem) {
  return {
    ...problem,
    requirements: JSON.parse(problem.requirements),
    constraints: JSON.parse(problem.constraints),
    rubric: JSON.parse(problem.rubric)
  };
}

module.exports = {
  getAllProblems,
  getProblemById,
  createProblem
};