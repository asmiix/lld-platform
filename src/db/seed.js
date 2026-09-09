const db = require("./database");

const problems = [
  {
    title: "Parking Lot",
    description:
      "Design a parking lot system that can accommodate different types of vehicles and parking spots.",
    requirements: [
      "Support multiple vehicle types",
      "Support different parking spot types",
      "Assign an appropriate parking spot",
      "Handle vehicle entry and exit",
      "Calculate parking fees"
    ],
    constraints: [
      "The parking lot may have multiple floors",
      "A vehicle should not occupy an incompatible spot",
      "The design should be extensible for new vehicle types"
    ],
    rubric: [
      "Class responsibilities",
      "Abstraction and interfaces",
      "Coupling and cohesion",
      "Extensibility",
      "Edge case handling"
    ]
  },
  {
    title: "Elevator System",
    description:
      "Design an elevator system for a building with multiple floors and elevators.",
    requirements: [
      "Support multiple elevators",
      "Handle requests from different floors",
      "Move elevators between floors",
      "Open and close doors",
      "Assign an appropriate elevator"
    ],
    constraints: [
      "The building may have multiple elevators",
      "An elevator should not exceed its capacity",
      "The design should support different scheduling strategies"
    ],
    rubric: [
      "Class responsibilities",
      "Abstraction and interfaces",
      "Coupling and cohesion",
      "Extensibility",
      "Edge case handling"
    ]
  },
  {
    title: "Vending Machine",
    description:
      "Design a vending machine that allows users to purchase products using different payment methods.",
    requirements: [
      "Display available products",
      "Accept payments",
      "Dispense products",
      "Handle insufficient payment",
      "Return change"
    ],
    constraints: [
      "A product may be out of stock",
      "The machine should support different payment methods",
      "The design should be extensible for new products"
    ],
    rubric: [
      "Class responsibilities",
      "Abstraction and interfaces",
      "Coupling and cohesion",
      "Extensibility",
      "Edge case handling"
    ]
  }
];

const insert = db.prepare(`
  INSERT INTO problems
  (title, description, requirements, constraints, rubric)
  VALUES (?, ?, ?, ?, ?)
`);

const seedProblems = db.transaction(() => {
  for (const problem of problems) {
    insert.run(
      problem.title,
      problem.description,
      JSON.stringify(problem.requirements),
      JSON.stringify(problem.constraints),
      JSON.stringify(problem.rubric)
    );
  }
});

seedProblems();

console.log("Problems seeded successfully");

db.close();