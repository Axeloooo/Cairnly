module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "infra",
        "refactor",
        "test",
        "chore",
        "perf",
        "build",
        "ci",
        "revert",
      ],
    ],
  },
};
