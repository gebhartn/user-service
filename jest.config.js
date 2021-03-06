require('dotenv').config()

module.exports = {
  clearMocks: true,
  displayName: 'users-service',
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/', '/db/', '/dist/'],
  verbose: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/*.*.{js,jsx}',
    '!**/dist/**',
    '!**/src/middleware/**',
    '!**/src/routes/**',
    '!**/src/app/**',
    '!**/config/**',
    '!**/src/express-callback/**',
  ],
}
