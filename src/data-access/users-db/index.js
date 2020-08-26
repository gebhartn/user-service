export function makeUsersDb({ makeDb }) {
  const db = makeDb()

  const selectRows = result => result.rows

  return Object.freeze({
    findAll,
    findById,
    findByEmail,
    findByHash,
    insert,
    update,
    remove,
  })

  async function findAll({ count, start }) {
    const query = {
      name: 'usr-findall',
      text:
        'select id, email, "firstName", "lastName", "createdAt", "updatedAt", "updatedBy", hash from users limit $1 offset $2',
      values: [count, start],
    }

    return selectRows(await db.query({ query }))
  }

  async function findById({ id }) {
    const query = {
      name: 'usr-findbyid',
      text: 'select * from users where id=$1',
      values: [id],
    }

    return selectRows(await db.query({ query }))[0]
  }

  async function findByEmail({ email }) {
    const query = {
      name: 'usr-findbyemail',
      text: 'select * from users where email=$1',
      values: [email],
    }

    return selectRows(await db.query({ query }))[0]
  }

  async function findByHash({ hash }) {
    const query = {
      name: 'usr-findbyhash',
      text: 'select * from users where hash=$1',
      values: [hash],
    }

    return selectRows(await db.query({ query }))[0]
  }

  async function insert({ user }) {
    const query = {
      name: 'usr-insert',
      text:
        'insert into users(email, "firstName", "lastName", "updatedBy", password, hash) values($1, $2, $3, $4, $5, $6) returning id, email, "firstName", "lastName", hash, "createdAt", "updatedAt"',
      values: [
        user.email,
        user.firstName,
        user.lastName,
        user.updatedBy,
        user.password,
        user.hash,
      ],
    }

    return selectRows(await db.query({ query }))[0]
  }

  async function update({ id, user }) {
    const query = {
      name: 'usr-update',
      text:
        'update users set email=$1, "firstName"=$2, "lastName"=$3, "updatedBy"=$4, hash=$5 where id=$6 returning id, email, "firstName", "lastName", hash, "createdAt", "updatedAt"',
      values: [
        user.email,
        user.firstName,
        user.lastName,
        user.updatedBy,
        user.hash,
        id,
      ],
    }

    return selectRows(await db.query({ query }))[0]
  }

  async function remove({ id }) {
    const query = {
      name: 'usr-delete',
      text: 'delete from users where id=$1',
      values: [id],
    }

    return selectRows(await db.query({ query }))
  }
}
