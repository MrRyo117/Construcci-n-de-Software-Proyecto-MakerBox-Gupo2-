const config = {
  branches: ["main", "feature-Variables-de-entorno,-secretos-y-automatizacion"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/github",
  ],
};

module.exports = config;
