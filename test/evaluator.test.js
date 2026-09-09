const test = require("node:test");
const assert = require("node:assert/strict");

const {
  evaluateSubmission
} = require("../src/modules/evaluations/rule.evaluator");

test("empty submission should receive zero score", () => {
  const submission = {
    classes: "",
    responsibilities: "",
    relationships: "",
    key_methods: "",
    design_decisions: "",
    edge_cases: ""
  };

  const result = evaluateSubmission(submission, {});

  assert.equal(result.overallScore, 0);
});

test("complete submission should receive full score", () => {
  const submission = {
    classes:
      "User, Booking, Room, BookingService and BookingRepository classes",
    responsibilities:
      "User manages users. Booking manages reservations. Room manages availability. BookingService handles business logic.",
    relationships:
      "Booking has-a User and Room. BookingService uses BookingRepository. This is an association and dependency relationship.",
    key_methods:
      "createBooking(), cancelBooking(), searchRoom(), updateBooking() and checkAvailability() methods",
    design_decisions:
      "I selected a layered design because it improves maintainability and testability. The trade-off is more classes and initial complexity, but the design is flexible and extensible.",
    edge_cases:
      "Handle invalid input, empty rooms, unavailable resources, duplicate bookings, not found records, null values, timeout, failure and database error."
  };

  const result = evaluateSubmission(submission, {});

  assert.equal(result.overallScore, 10);
});

test("relationships and design decisions should be detected", () => {
  const submission = {
    classes: "User, Booking and Room classes are required.",
    responsibilities:
      "User manages users and Booking manages reservations.",
    relationships:
      "Booking has-a User and uses Room. This is an association relationship.",
    key_methods:
      "createBooking() and cancelBooking() methods are required.",
    design_decisions:
      "I selected this pattern because it improves scalability. The trade-off is additional complexity.",
    edge_cases: "Handle invalid input and unavailable rooms."
  };

  const result = evaluateSubmission(submission, {});

  assert.equal(result.criteria[2].score, 2);
  assert.equal(result.criteria[4].score, 1.5);
});