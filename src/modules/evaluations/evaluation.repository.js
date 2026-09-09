const db = require("../../db/database");

function createFeedback(feedback) {
  const stmt = db.prepare(`
    INSERT INTO feedback
    (
      submission_id,
      overall_score,
      summary,
      criteria,
      strengths,
      improvements
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    feedback.submissionId,
    feedback.overallScore,
    feedback.summary,
    JSON.stringify(feedback.criteria),
    JSON.stringify(feedback.strengths),
    JSON.stringify(feedback.improvements)
  );

  return db.prepare(`
    SELECT *
    FROM feedback
    WHERE id = ?
  `).get(result.lastInsertRowid);
}

module.exports = {
  createFeedback
};