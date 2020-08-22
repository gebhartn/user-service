export function buildMakeUser({ md5, validate }) {
  return function makeUser({ email, firstName, lastName, password } = {}) {
    if (!email) throw new Error('User must have an email.')

    if (!password) throw new Error('User must have a password.')

    if (!validate(email)) throw new Error('User must have a valid email')

    if (!validate(password)) throw new Error('User must have a valid password')

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
  }
}
