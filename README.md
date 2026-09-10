# 🧠 LLD Practice

### Design. Practice. Improve.

A focused **Low-Level Design (LLD) practice platform** built to help learners move beyond memorizing design patterns and actually practice making design decisions, explaining trade-offs, handling edge cases, and learning from structured feedback.

> **Practice real-world design problems → get rubric-based feedback → iterate on your next attempt.**

---

## ✨ Why LLD Practice?

LLD preparation is often fragmented: learners solve problems on paper or in an editor, but have no consistent way to evaluate *why* a design is good or where it can be improved.

**LLD Practice** turns that into a feedback loop:

```text
┌─────────────────┐
│  Choose Problem │
└────────┬────────┘
         ↓
┌─────────────────┐
│  Design Solution│
└────────┬────────┘
         ↓
┌─────────────────┐
│ Explain Decisions│
│  + Edge Cases   │
└────────┬────────┘
         ↓
┌─────────────────┐
│     Submit      │
└────────┬────────┘
         ↓
┌─────────────────┐
│    Evaluate     │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Review Feedback │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Iterate / Retry │
└─────────────────┘
🚀 Features
🎯 Problem-based Practice

Learners choose from LLD problems and work through realistic design scenarios.

🧩 Structured Submissions

Each attempt captures three important dimensions:

Design — the proposed solution
Design Decisions — reasoning, trade-offs, and architectural choices
Edge Cases — problem-specific scenarios the design should handle

This keeps the learner focused on both what they designed and why they designed it.

📊 Deterministic Rubric-based Evaluation

The MVP uses a rule-based evaluator instead of an LLM.

This gives the first version:

predictable results
repeatable scoring
easier testing
easier debugging
no dependency on model variability
🔁 Evaluation Reliability

Evaluation is modeled as an explicit state:

pending → completed
    │
    └────→ failed → retry

A failed evaluation can be retried rather than leaving the learner with an unusable attempt.

📚 Attempt History

Previous submissions and feedback are preserved so learners can revisit their work and improve over time.

🏗️ Architecture

The project follows a modular backend structure so the core workflow remains easy to extend.

                    ┌──────────────────────┐
                    │      Frontend        │
                    │  HTML / CSS / JS     │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ↓
                    ┌──────────────────────┐
                    │   Express Backend    │
                    ├──────────────────────┤
                    │ Problems             │
                    │ Submissions          │
                    │ Evaluations           │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ↓                           ↓
        ┌─────────────────┐        ┌──────────────────┐
        │ SQLite Database │        │ Evaluation       │
        │                 │        │ Strategy         │
        │ Problems        │        │                  │
        │ Submissions     │        │ Rule-based MVP   │
        │ Feedback        │        │ Future strategies│
        └─────────────────┘        └──────────────────┘
Evaluation Strategy

Evaluation is intentionally separated behind a strategy abstraction:

EvaluationStrategy
       │
       └── RuleBasedStrategy   ← current MVP

This means a future evaluator can be introduced without coupling evaluation logic to the submission flow.

📁 Project Structure
lld-platform/
│
├── public/
│   ├── index.html
│   ├── practice.html
│   ├── app.js
│   ├── practice.js
│   └── style.css
│
├── src/
│   ├── app.js
│   │
│   ├── db/
│   │   ├── init.js
│   │   └── seed.js
│   │
│   └── modules/
│       ├── problems/
│       ├── submissions/
│       └── evaluations/
│           └── strategies/
│
├── package.json
└── README.md
🛠️ Tech Stack
Layer	Technology
Frontend	HTML, CSS, JavaScript
Backend	Node.js, Express
Database	SQLite
DB Driver	better-sqlite3
API	REST-style HTTP endpoints
Evaluation	Deterministic rule-based strategy
Deployment	Render + static frontend hosting
⚡ Getting Started
Prerequisites

Make sure you have:

Node.js
npm
1. Clone the repository
git clone https://github.com/asmiix/lld-platform.git
cd lld-platform
2. Install dependencies
npm install
3. Initialize the database
npm run db:init
4. Seed practice problems
npm run db:seed
5. Start the application
npm start

The server uses the PORT environment variable when provided, otherwise it runs locally on port 5000.

For development:

npm run dev
🔌 API Overview
Problems
GET /api/problems
GET /api/problems/:id
Submissions
POST /api/submissions
GET  /api/submissions/:id
GET  /api/submissions/problem/:problemId
POST /api/submissions/:id/retry

The submission workflow separates receiving an attempt from successfully evaluating it.

🧠 Key Design Decisions
1. Structured learner input

Instead of accepting one unstructured answer, the platform asks learners to explicitly provide:

Design → Decisions → Edge Cases

This makes the learner's reasoning visible and creates clearer signals for evaluation.

2. Deterministic evaluation first

The MVP deliberately avoids making an LLM responsible for scoring.

A deterministic evaluator provides a stable baseline that can be tested and reasoned about. More sophisticated evaluation can be added later.

3. Strategy-based evaluation

Evaluation is isolated behind a strategy abstraction.

This follows a simple principle:

Change the evaluator without changing the submission workflow.

4. Explicit evaluation states

A submission can be:

pending
completed
failed

This makes asynchronous/failed evaluation visible to the learner and enables retry.

5. Preserve attempts

A learner's previous work is valuable learning data. Keeping submission history makes the product about improvement, not just getting a score once.

⚖️ Trade-offs
Decision	Why	Trade-off
Rule-based evaluation vs. LLM	Predictable and testable	Less flexible than an expert/LLM evaluator
Structured fields	Better evaluation signals	More effort for the learner
SQLite	Simple MVP persistence	Needs a stronger persistence strategy at production scale
Strategy abstraction	Easy evaluator replacement	Adds some structure early
Attempt history	Supports iteration	Requires additional persistence and UI work
🔮 Future Direction

The current MVP intentionally keeps the scope small.

Potential next steps:

🤖 Optional LLM-assisted evaluation
📈 Attempt-to-attempt progress tracking
🔍 More problem-specific feedback
🧪 Richer rubric and evaluation rules
👤 Authentication and learner profiles
🏆 Progress dashboards
🗂️ Larger problem library
☁️ Production-grade persistent database

The goal is to improve the practice → feedback → iteration loop before expanding the product surface.

🤖 AI Usage

AI was used as a development copilot for research synthesis, design reasoning, implementation support, debugging, and documentation.

The final product direction and implementation decisions remained developer-owned and were validated against the actual application and project requirements.

For the detailed AI usage report, see:

AI_USAGE.md

📌 Known Limitations
The current evaluator is deterministic and intentionally limited compared with an expert human reviewer.
Feedback quality depends on the implemented rubric and rules.
Advanced attempt-to-attempt analytics are not yet part of the MVP.
SQLite is suitable for the MVP/local development but requires an appropriate durable storage strategy for production scale.
Authentication and multi-user features are outside the current MVP scope.
🌱 Product Philosophy

Don't just practice more. Practice, understand the feedback, and design better the next time.

LLD Practice is built around that idea.
