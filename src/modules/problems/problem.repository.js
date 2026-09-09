const db = require("../../db/database");

function getAllProblems() {
  return db
    .prepare(`
      SELECT id, title, description, requirements, constraints, rubric
      FROM problems
      ORDER BY id
    `)
    .all();
}

function getProblemById(id) {
  return db
    .prepare(`
      SELECT id, title, description, requirements, constraints, rubric
      FROM problems
      WHERE id = ?
    `)
    .get(id);
}

function createProblem(problem) {
  const stmt = db.prepare(`
    INSERT INTO problems
    (title, description, requirements, constraints, rubric)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    problem.title,
    problem.description,
    JSON.stringify(problem.requirements),
    JSON.stringify(problem.constraints),
    JSON.stringify(problem.rubric)
  );

  return getProblemById(result.lastInsertRowid);
}

module.exports = {
  getAllProblems,
  getProblemById,
  createProblem
};