module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      // commit type
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert", "bug"]
    ],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"]
  }
};
