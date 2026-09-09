const problemsContainer = document.getElementById("problems-container");

async function loadProblems() {
  try {
    const response = await fetch("/api/problems");
    const problems = await response.json();

    problemsContainer.innerHTML = problems
      .map(
        (problem) => `
          <div class="problem-card">
            <h3>${problem.title}</h3>
            <p>${problem.description}</p>
            <button onclick="startPractice(${problem.id})">
              Start Practice
            </button>
          </div>
        `
      )
      .join("");
  } catch (error) {
    problemsContainer.innerHTML = "<p>Failed to load problems.</p>";
    console.error(error);
  }
}

function startPractice(problemId) {
  window.location.href = `/practice.html?id=${problemId}`;
}

loadProblems();