const EvaluationStrategy = require("./evaluation.strategy");
const { evaluateSubmission } = require("../rule.evaluator");

class RuleBasedEvaluationStrategy extends EvaluationStrategy {
  evaluate(submission, problem) {
    return evaluateSubmission(submission, problem);
  }
}

module.exports = RuleBasedEvaluationStrategy;