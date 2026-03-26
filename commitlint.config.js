export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // New feature
        "fix", // Bug fix
        "docs", // Documentation
        "style", // Code style
        "refactor", // Code refactoring
        "perf", // Performance improvement
        "test", // Testing
        "chore", // Maintenance tasks
        "ci", // CI/CD changes
        "build", // Build system changes
      ],
    ],
    "subject-case": [2, "always", "lower-case"],
    "subject-max-length": [2, "always", 100],
  },
};
