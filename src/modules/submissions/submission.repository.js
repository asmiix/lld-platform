// const db = require("../../db/database");

// function createSubmission(submission) {
//   const stmt = db.prepare(`
//     INSERT INTO submissions
//     (
//       problem_id,
//       classes,
//       responsibilities,
//       relationships,
//       key_methods,
//       design_decisions,
//       edge_cases
//     )
//     VALUES (?, ?, ?, ?, ?, ?, ?)
//   `);

//   const result = stmt.run(
//     submission.problem_id,
//     submission.classes,
//     submission.responsibilities,
//     submission.relationships,
//     submission.key_methods,
//     submission.design_decisions,
//     submission.edge_cases
//   );

//   return db.prepare(`
//     SELECT *
//     FROM submissions
//     WHERE id = ?
//   `).get(result.lastInsertRowid);
// }

// function getSubmissionById(id) {
//   return db.prepare(`
//     SELECT *
//     FROM submissions
//     WHERE id = ?
//   `).get(id);
// }

// module.exports = {
//   createSubmission,
//   getSubmissionById
// };


const db = require("../../db/database");

function createSubmission(submission) {
  const stmt = db.prepare(`
    INSERT INTO submissions
    (
      problem_id,
      classes,
      responsibilities,
      relationships,
      key_methods,
      design_decisions,
      edge_cases
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    submission.problem_id,
    submission.classes,
    submission.responsibilities,
    submission.relationships,
    submission.key_methods,
    submission.design_decisions,
    submission.edge_cases
  );

  return db.prepare(`
    SELECT *
    FROM submissions
    WHERE id = ?
  `).get(result.lastInsertRowid);
}

function getSubmissionById(id) {
  return db.prepare(`
    SELECT *
    FROM submissions
    WHERE id = ?
  `).get(id);
}


// NEW: Get all previous attempts for a problem

function getSubmissionsByProblemId(problemId) {
  return db.prepare(`
    SELECT *
    FROM submissions
    WHERE problem_id = ?
    ORDER BY id DESC
  `).all(problemId);
}

function updateSubmissionStatus(id, status) {
  db.prepare(`
    UPDATE submissions
    SET status = ?
    WHERE id = ?
  `).run(status, id);

  return getSubmissionById(id);
}
module.exports = {
  createSubmission,
  getSubmissionById,
  getSubmissionsByProblemId,
  updateSubmissionStatus
};