// Use the published release page for browser and GitHub links.
const MYLIMITS_CONFIG = Object.freeze({
  github: "https://github.com/voiddev011/mylimits",
  release: "https://github.com/voiddev011/mylimits/releases/tag/v3.4.0",
});

const githubStarTarget = document.querySelector("[data-github-stars]");
if (githubStarTarget) {
  fetch("https://api.github.com/repos/voiddev011/mylimits")
    .then((response) => (response.ok ? response.json() : null))
    .then((data) => {
      if (!data || typeof data.stargazers_count !== "number") return;
      const value =
        data.stargazers_count >= 1000
          ? `${(data.stargazers_count / 1000).toFixed(1)}k`
          : String(data.stargazers_count);
      githubStarTarget.textContent = `★ ${value}`;
    })
    .catch(() => {
      githubStarTarget.textContent = "★";
    });
}

for (const link of document.querySelectorAll("[data-release-link]")) {
  link.href = MYLIMITS_CONFIG.release;
}
