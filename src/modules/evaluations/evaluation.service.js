const db = require("../../db/database");
const repository = require("./evaluation.repository");
const RuleBasedEvaluationStrategy = require("./strategies/rule-based.strategy");

const ruleBasedStrategy = new RuleBasedEvaluationStrategy();

function evaluateSubmissionById(submissionId) {
  const submission = db
    .prepare(`
      SELECT *
      FROM submissions
      WHERE id = ?
    `)
    .get(submissionId);

  if (!submission) {
    return null;
  }

  const problem = db
    .prepare(`
      SELECT *
      FROM problems
      WHERE id = ?
    `)
    .get(submission.problem_id);

  if (!problem) {
    return null;
  }

  const result = ruleBasedStrategy.evaluate(
    submission,
    problem
  );

  return repository.createFeedback({
    submissionId,
    ...result
  });
}

module.exports = {
  evaluateSubmissionById
};