module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 80,
  proseWrap: 'always',
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  semi: true,
  arrowParens: 'avoid',
  overrides: [
    {
      files: ['.prettierrc', '.eslintrc'],
      options: {
        parser: 'json',
      },
    },
    {
      files: ['package.json'],
      options: {
        printWidth: 180,
      },
    },
  ],
};
