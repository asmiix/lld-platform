function hasMeaningfulContent(value, minimumLength = 20) {
  return typeof value === "string" && value.trim().length >= minimumLength;
}

function containsAny(text, keywords) {
  const value = (text || "").toLowerCase();

  return keywords.some((keyword) =>
    value.includes(keyword.toLowerCase())
  );
}

function evaluateSubmission(submission, problem) {
  const criteria = [];
  const strengths = [];
  const improvements = [];

  let totalScore = 0;

  // 1. Classes
  let classesScore = 0;

  if (hasMeaningfulContent(submission.classes, 30)) {
    classesScore = 2;
    strengths.push(
      "You have identified the main classes of the system."
    );
  } else {
    improvements.push(
      "Add meaningful classes and explain why each class is needed."
    );
  }

  criteria.push({
    name: "Classes",
    score: classesScore,
    maxScore: 2,
    feedback:
      classesScore === 2
        ? "Main classes are clearly identified."
        : "Class identification needs more detail."
  });

  totalScore += classesScore;

  // 2. Responsibilities
  let responsibilitiesScore = 0;

  if (hasMeaningfulContent(submission.responsibilities, 40)) {
    responsibilitiesScore = 2;
    strengths.push(
      "You have explained the responsibilities of your classes."
    );
  } else {
    improvements.push(
      "Explain the responsibility of each class and avoid assigning all work to one class."
    );
  }

  criteria.push({
    name: "Responsibilities",
    score: responsibilitiesScore,
    maxScore: 2,
    feedback:
      responsibilitiesScore === 2
        ? "Responsibilities are sufficiently described."
        : "Responsibilities need clearer explanation."
  });

  totalScore += responsibilitiesScore;

  // 3. Relationships
  let relationshipsScore = 0;

  if (
    hasMeaningfulContent(submission.relationships, 30) &&
    containsAny(submission.relationships, [
      "has-a",
      "is-a",
      "association",
      "composition",
      "aggregation",
      "inheritance",
      "depends",
      "uses",
      "relationship",
      "owns",
        "contains",
        "connects",
        "connected",
        "linked",
        "one-to-many",
        "one-to-one",
        "many-to-many",
        "performance",
        "maintainability",
        "consistency",
        "reliability",
        "complexity",
        "cost",
        "benefit"
    ])
  ) {
    relationshipsScore = 2;
    strengths.push(
      "You have described relationships between the main components."
    );
  } else {
    improvements.push(
      "Explain how the classes interact using relationships such as association, composition, inheritance, or dependency."
    );
  }

  criteria.push({
    name: "Relationships",
    score: relationshipsScore,
    maxScore: 2,
    feedback:
      relationshipsScore === 2
        ? "Class relationships are described."
        : "Class relationships need more clarity."
  });

  totalScore += relationshipsScore;

  // 4. Key methods
  let methodsScore = 0;

  if (
    hasMeaningfulContent(submission.key_methods, 30) &&
    containsAny(submission.key_methods, [
      "method",
      "function",
      "create",
      "add",
      "remove",
      "assign",
      "release",
      "search",
      "update",
      "get",
      "set"
    ])
  ) {
    methodsScore = 1.5;
    strengths.push(
      "You have identified important methods and system behaviour."
    );
  } else {
    improvements.push(
      "Mention important methods and explain how the main use cases will work."
    );
  }

  criteria.push({
    name: "Key Methods",
    score: methodsScore,
    maxScore: 1.5,
    feedback:
      methodsScore === 1.5
        ? "Important methods are mentioned."
        : "Add methods for the main system operations."
  });

  totalScore += methodsScore;

  // 5. Design decisions
  let decisionsScore = 0;

  if (
    hasMeaningfulContent(submission.design_decisions, 40) &&
    containsAny(submission.design_decisions, [
      "trade-off",
      "tradeoff",
      "because",
      "reason",
      "why",
      "scalability",
      "extensible",
      "flexible",
      "pattern",
      "interface",
      "decided"
    ])
  ) {
    decisionsScore = 1.5;
    strengths.push(
      "You have explained important design decisions and trade-offs."
    );
  } else {
    improvements.push(
      "Explain why you selected this design and mention at least one trade-off."
    );
  }

  criteria.push({
    name: "Design Decisions",
    score: decisionsScore,
    maxScore: 1.5,
    feedback:
      decisionsScore === 1.5
        ? "Design decisions include reasoning."
        : "Add reasoning and trade-offs behind your design."
  });

  totalScore += decisionsScore;

  // 6. Edge cases
  let edgeCasesScore = 0;

  if (
    hasMeaningfulContent(submission.edge_cases, 30) &&
    containsAny(submission.edge_cases, [
      "full",
      "empty",
      "invalid",
      "duplicate",
      "not found",
      "unavailable",
      "failure",
      "error",
      "null",
      "timeout",
      "already"
    ])
  ) {
    edgeCasesScore = 1;
    strengths.push(
      "You have considered important edge cases."
    );
  } else {
    improvements.push(
      "Add edge cases such as unavailable resources, invalid input, duplicate requests, and failure scenarios."
    );
  }

  criteria.push({
    name: "Edge Cases",
    score: edgeCasesScore,
    maxScore: 1,
    feedback:
      edgeCasesScore === 1
        ? "Important edge cases are considered."
        : "More failure and boundary cases are needed."
  });

  totalScore += edgeCasesScore;

  const overallScore = Number(totalScore.toFixed(1));

  return {
    overallScore,
    summary: `Your design scored ${overallScore}/10 across six evaluation areas. Review the strengths and improvements to refine your design.`,
    criteria,
    strengths,
    improvements
  };
}

module.exports = {
  evaluateSubmission
};