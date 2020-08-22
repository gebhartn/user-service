export function buildMakeUser({ md5, validate }) {
  return function makeUser({
    id,
    email,
    firstName,
    lastName,
    password,
    updatedOn,
    createdOn,
  } = {}) {
    UserMustHave.prototype = new Error()

    if (!id) throw new UserMustHave('an id.')

    if (!email) throw new UseCreationError('an email.')

    if (!password) throw new UserMustHave('a password.')

    if (!updatedOn) throw new UserMustHave('an update date')

    if (!createdOn) throw new UserMustHave('a creation date')

    if (!validate(email)) throw new UserMustHave('a valid email')

    if (!validate(password)) throw new UserMustHave('a valid password')

    let hash

    return Object.freeze({
      getId: () => id,
      getEmail: () => email,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getPassword: () => password,
      getUpdatedOn: () => updatedOn,
      getCreatedOn: () => createdOn,
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
