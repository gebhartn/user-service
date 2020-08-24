require('dotenv').config()

module.exports = {
  clearMocks: true,
  displayName: 'users-service',
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/', '/db/', '/dist/'],
  verbose: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/__tests__/**',
  ],
}
