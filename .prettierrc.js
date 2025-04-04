module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  endOfLine: 'lf',

  plugins: [],
  overrides: [
    {
      files: ['*.jsx', '*.tsx'],
      options: {
        printWidth: 100,
        jsxSingleQuote: false,
        trailingComma: 'es5',
      },
    },
  ],

  overrides: [
    {
      files: ['*.json', '.prettierrc'],
      options: {
        printWidth: 80,
      },
    },
    {
      files: ['*.md'],
      options: {
        proseWrap: 'always',
      },
    },
  ],

  // Special Handling
  embeddedLanguageFormatting: 'auto',
  htmlWhitespaceSensitivity: 'css',
  vueIndentScriptAndStyle: false,
};
