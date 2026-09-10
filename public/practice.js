const params = new URLSearchParams(window.location.search);
const problemId = params.get("id");

const problemDetails = document.getElementById("problem-details");
const practiceForm = document.getElementById("practice-form");
const submitMessage = document.getElementById("submit-message");
const feedbackContainer = document.getElementById("feedback-container");

// ====================
// LOAD PROBLEM
// ====================

async function loadProblem() {
  try {
    const response = await fetch(`https://lld-platform-3wmf.onrender.com/api/problems/${problemId}`);
    const problem = await response.json();

    problemDetails.innerHTML = `
      <h2>${problem.title}</h2>
      <p>${problem.description}</p>

      <h3>Requirements</h3>
      <ul>
        ${problem.requirements
          .map(item => `<li>${item}</li>`)
          .join("")}
      </ul>

      <h3>Constraints</h3>
      <ul>
        ${problem.constraints
          .map(item => `<li>${item}</li>`)
          .join("")}
      </ul>
    `;
  } catch (error) {
    problemDetails.innerHTML = "<p>Failed to load problem.</p>";
  }
}


// ====================
// SAVE DRAFT
// ====================

function saveDraft() {
  const draft = {
    classes: document.getElementById("classes").value,
    responsibilities: document.getElementById("responsibilities").value,
    relationships: document.getElementById("relationships").value,
    key_methods: document.getElementById("key_methods").value,
    design_decisions: document.getElementById("design_decisions").value,
    edge_cases: document.getElementById("edge_cases").value
  };

  localStorage.setItem(
    `lld-draft-${problemId}`,
    JSON.stringify(draft)
  );
}


// ====================
// LOAD DRAFT
// ====================

function loadDraft() {
  const saved = localStorage.getItem(`lld-draft-${problemId}`);

  if (!saved) return;

  const draft = JSON.parse(saved);

  document.getElementById("classes").value =
    draft.classes || "";

  document.getElementById("responsibilities").value =
    draft.responsibilities || "";

  document.getElementById("relationships").value =
    draft.relationships || "";

  document.getElementById("key_methods").value =
    draft.key_methods || "";

  document.getElementById("design_decisions").value =
    draft.design_decisions || "";

  document.getElementById("edge_cases").value =
    draft.edge_cases || "";
}

// Har field mein type karte hi answers save honge
const fields = [
  "classes",
  "responsibilities",
  "relationships",
  "key_methods",
  "design_decisions",
  "edge_cases"
];

fields.forEach((fieldId) => {
  document.getElementById(fieldId).addEventListener("input", saveDraft);
});

// ====================
// LOAD PREVIOUS ATTEMPTS
// ====================

async function loadHistory() {
  try {
    const response = await fetch(
      `https://lld-platform-3wmf.onrender.com/api/submissions/problem/${problemId}`
    );

    const submissions = await response.json();

    const historyContainer =
      document.getElementById("history-container");

    if (submissions.length === 0) {
      historyContainer.innerHTML = "";
      return;
    }

    historyContainer.innerHTML = `
      <div class="history-card">
        <h2>Previous Attempts</h2>

        ${submissions.map((submission, index) => `
          <div class="attempt-card">

            <h3>Attempt ${submissions.length - index}</h3>

            <p>
              <strong>Submitted:</strong>
              ${submission.created_at}
            </p>

            <p>
              <strong>Status:</strong>
              ${submission.status}
            </p>

            <button
              onclick="viewAttempt(${submission.id})"
            >
              View Design
            </button>

          </div>
        `).join("")}

      </div>
    `;

  } catch (error) {
    console.error("Failed to load history:", error);
  }
}

// ====================
// TOGGLE HISTORY
// ====================

const historyToggle =
  document.getElementById("history-toggle");

const historyContainer =
  document.getElementById("history-container");

historyToggle.addEventListener("click", () => {
  historyContainer.classList.toggle("hidden");

  if (historyContainer.classList.contains("hidden")) {
    historyToggle.textContent = "Previous Attempts";
  } else {
    historyToggle.textContent = "Hide Previous Attempts";
  }
});

// ====================
// VIEW PREVIOUS ATTEMPT
// ====================

async function viewAttempt(id) {
  try {
    const response = await fetch(`https://lld-platform-3wmf.onrender.com/api/submissions/${id}`);
    const submission = await response.json();

    const modal = document.getElementById("design-modal");
    const designView = document.getElementById("design-view");

    designView.innerHTML = `
      <h2>Previous Design</h2>

      <div class="design-view-section">
        <h3>Classes</h3>
        <p>${submission.classes || "Not provided"}</p>
      </div>

      <div class="design-view-section">
        <h3>Responsibilities</h3>
        <p>${submission.responsibilities || "Not provided"}</p>
      </div>

      <div class="design-view-section">
        <h3>Relationships</h3>
        <p>${submission.relationships || "Not provided"}</p>
      </div>

      <div class="design-view-section">
        <h3>Key Methods</h3>
        <p>${submission.key_methods || "Not provided"}</p>
      </div>

      <div class="design-view-section">
        <h3>Design Decisions</h3>
        <p>${submission.design_decisions || "Not provided"}</p>
      </div>

      <div class="design-view-section">
        <h3>Edge Cases</h3>
        <p>${submission.edge_cases || "Not provided"}</p>
      </div>
    `;

    modal.classList.remove("hidden");

  } catch (error) {
    console.error("Failed to load attempt:", error);
  }
}


// ====================
// CLOSE DESIGN MODAL
// ====================

document.getElementById("close-design-modal").addEventListener("click", () => {
  document.getElementById("design-modal").classList.add("hidden");
});

// ====================
// SUBMIT DESIGN
// ====================

practiceForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // IMPORTANT:
  // Submit se pehle answers save karenge
  saveDraft();

  const submission = {
    problem_id: Number(problemId),

    classes: document.getElementById("classes").value,

    responsibilities:
      document.getElementById("responsibilities").value,

    relationships:
      document.getElementById("relationships").value,

    key_methods:
      document.getElementById("key_methods").value,

    design_decisions:
      document.getElementById("design_decisions").value,

    edge_cases:
      document.getElementById("edge_cases").value
  };

  try {
    const response = await fetch("https://lld-platform-3wmf.onrender.com/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submission)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    submitMessage.textContent =
      "Design submitted successfully!";

    // Feedback ek hi jagah update hoga
    displayFeedback(result.feedback);

    // IMPORTANT:
    // practiceForm.reset() NAHI karna
    // Isliye answers blank nahi honge

  } catch (error) {
    submitMessage.textContent = error.message;
  }
});

function parseJsonField(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value);
  } catch (error) {
    return [];
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}


// ====================
// DISPLAY FEEDBACK
// ====================

function displayFeedback(feedback) {
  if (!feedback) {
    feedbackContainer.innerHTML = "";
    return;
  }

  const strengths = parseJsonField(feedback.strengths);
  const improvements = parseJsonField(feedback.improvements);
  const criteria = parseJsonField(feedback.criteria);

  feedbackContainer.innerHTML = `
    <div class="feedback-card">
      <h2>Evaluation Results</h2>

      console.log("Feedback object:", feedback);

      <div class="feedback-score">
         ${Number(feedback.overallScore ?? feedback.overall_score ?? 0)}/10 
        <span>Overall Score</span>
      </div>

      <div class="feedback-section">
        <h3>Criteria Breakdown</h3>

        <div class="criteria-list">
          ${
            criteria.length
              ? criteria
                  .map(
                    (criterion) => `
                      <div class="criteria-item">
                        <div class="criteria-header">
                          <span>${escapeHtml(criterion.name)}</span>
                          <strong>
                            ${criterion.score}/${criterion.maxScore}
                          </strong>
                        </div>

                        <div class="criteria-bar">
                          <div
                            class="criteria-progress"
                            style="width: ${
                              (criterion.score / criterion.maxScore) * 100
                            }%"
                          ></div>
                        </div>

                        <p>${escapeHtml(criterion.feedback)}</p>
                      </div>
                    `
                  )
                  .join("")
              : "<p>No criteria details available.</p>"
          }
        </div>
      </div>

      <div class="feedback-section">
        <h3>Summary</h3>
        <p>${escapeHtml(feedback.summary)}</p>
      </div>

      <div class="feedback-section">
        <h3>Strengths</h3>
        ${
          strengths.length
            ? `<ul>
                ${strengths
                  .map((item) => `<li>${escapeHtml(item)}</li>`)
                  .join("")}
              </ul>`
            : "<p>No strengths recorded yet.</p>"
        }
      </div>

      <div class="feedback-section">
        <h3>Areas to Improve</h3>
        ${
          improvements.length
            ? `<ul>
                ${improvements
                  .map((item) => `<li>${escapeHtml(item)}</li>`)
                  .join("")}
              </ul>`
            : "<p>No improvements recorded yet.</p>"
        }
      </div>
    </div>
  `;
}


// ====================
// INITIALIZE PAGE
// ====================

loadProblem();
loadDraft();
loadHistory();
