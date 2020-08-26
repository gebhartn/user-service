export function buildMakeUser({ md5 }) {
  return function makeUser({
    email,
    firstName,
    lastName,
    password,
    updatedBy,
  }) {
    let hash

    return Object.freeze({
      getEmail: () => email,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getPassword: () => password,
      getHash: () => hash || (hash = makeHash()),
      getUpdatedBy: () => updatedBy,
    })

    function makeHash() {
      return md5(email + (firstName || '') + (lastName || ''))
    }
  }
}
