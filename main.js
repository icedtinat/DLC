const projects = [
  {
    title: "Customer Portal Redesign",
    date: "March 10, 2026",
    progress: 54,
    accent: "#2563eb",
  },
  {
    title: "Release Workflow Automation",
    date: "March 12, 2026",
    progress: 72,
    accent: "#0f172a",
  },
  {
    title: "API Reliability Dashboard",
    date: "March 15, 2026",
    progress: 41,
    accent: "#3b82f6",
  },
  {
    title: "Internal CLI Toolkit",
    date: "March 18, 2026",
    progress: 87,
    accent: "#1d4ed8",
  },
  {
    title: "Onboarding Flow Refresh",
    date: "March 21, 2026",
    progress: 63,
    accent: "#2563eb",
  },
  {
    title: "Design System Tokens",
    date: "March 24, 2026",
    progress: 36,
    accent: "#334155",
  },
];

const projectGrid = document.getElementById("project-grid");
const textarea = document.getElementById("project-description");

function renderProjects() {
  projectGrid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card">
          <span class="project-card__status">Active</span>
          <h3>${project.title}</h3>
          <div class="project-card__meta">
            <span class="project-card__date">${project.date}</span>
            <span class="project-card__progress">
              <span class="project-card__ring" style="--value: ${project.progress}; --ring-color: ${project.accent};"></span>
              ${project.progress}%
            </span>
          </div>
        </article>
      `
    )
    .join("");
}

function autoresizeComposer() {
  textarea.style.height = "auto";
  textarea.style.height = `${Math.max(textarea.scrollHeight, 184)}px`;
}

textarea.addEventListener("input", autoresizeComposer);

renderProjects();
autoresizeComposer();
