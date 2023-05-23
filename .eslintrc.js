module.exports = {
  extends: ['@exmg/eslint-config-lit'],
  env: {
    jest: true,
  },
  ignorePatterns: ['**/*-css.ts', 'dist', '*.cjs', '.*.*', '*.config.*', '/docs/*', '**/*.d.ts'],
};
