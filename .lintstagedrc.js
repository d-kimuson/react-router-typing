module.exports = {
  "**/*.{ts,js,json,md,yml,yaml}": [
    "prettier --write",
    "cspell lint --gitignore --cache",
  ],
  "**/*.ts": ["eslint --cache --fix"],
}
