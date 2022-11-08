const OFF = 0;
const ERROR = 2;

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: [
    'simple-import-sort',
    // import helps to configure simple-import-sort
    'import',
  ],
  rules: {
    // (This helps configure simple-import-sort) Make sure all imports are at the top of the file
    'import/first': ERROR,

    // (This helps configure simple-import-sort) Make sure there's a newline after the imports
    'import/newline-after-import': ERROR,

    // (This helps configure simple-import-sort) Merge imports of the same file
    'import/no-duplicates': ERROR,

    indent: OFF,

    'keyword-spacing': [ERROR, {after: true, before: true}],

    'no-inner-declarations': [ERROR, 'functions'],

    'no-multi-spaces': ERROR,

    'no-restricted-syntax': [ERROR, 'WithStatement'],

    'no-unused-expressions': ERROR,

    'no-use-before-define': OFF,

    'no-useless-concat': OFF,

    quotes: [ERROR, 'single', {allowTemplateLiterals: true, avoidEscape: true}],

    // This sorts re-exports (`export * from 'foo';`), but not other types of exports.
    'simple-import-sort/exports': ERROR,

    'simple-import-sort/imports': [
      ERROR,
      {
        // The default grouping, but with type imports first as a separate group.
        // See: https://github.com/lydell/eslint-plugin-simple-import-sort/blob/d9a116f71302c5dcfc1581fc7ded8d77392f1924/examples/.eslintrc.js#L122-L133
        groups: [['^.*\\u0000$'], ['^\\u0000'], ['^@?\\w'], ['^'], ['^\\.']],
      },
    ],

    'space-before-blocks': ERROR,

    'space-before-function-paren': OFF,

    strict: ERROR,

    'valid-typeof': [ERROR, {requireStringLiterals: true}],
  },
};
