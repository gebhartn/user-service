export function buildMakeUser({ md5, validate }) {
  return function makeUser({ email, firstName, lastName, password } = {}) {
    UserMustHave.prototype = new Error()

    if (!email) throw new UseCreationError('an email.')

    if (!password) throw new UserMustHave('a password.')

    if (!validate(email)) throw new UserMustHave('a valid email')

    if (!validate(password)) throw new UserMustHave('a valid password')

    let hash

    return Object.freeze({
      getEmail: () => email,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getPassword: () => password,
      getHash: () => hash || (hash = makeHash()),
    })

    function makeHash() {
      return md5(email + (firstName || '') + (lastName || '') + password)
    }

    function UserMustHave(message) {
      this.name = 'UserMustHave'
      this.message = 'User must have ' + message
      this.stack = new Error().stack
    }
  }
}
