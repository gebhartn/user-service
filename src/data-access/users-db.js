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
        'select id, email, first_name, last_name, created_at, updated_at, updated_by_user_id, hash_code from users limit $1 offset $2',
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

    return selectRows(await db.query({ query }))
  }

  async function findByEmail({ email }) {
    const query = {
      name: 'usr-findbyemail',
      text: 'select * from users where email=$1',
      values: [email],
    }

    return selectRows(await db.query({ query }))
  }

  async function findByHash({ hash }) {
    const query = {
      name: 'usr-findbyhash',
      text: 'select * from users where hash_code=$1',
      values: [hash],
    }

    return selectRows(await db.query({ query }))
  }

  async function insert({ user }) {
    const query = {
      name: 'usr-insert',
      text:
        'insert into users(email, first_name, last_name, password, hash_code) values($1, $2, $3, $4, $5) returning id',
      values: [
        user.email,
        user.firstName,
        user.lastName,
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
        'update users set email=$1, first_name=$2, last_name=$3, password=$4 where id=$5',
      values: [user.email, user.firstName, user.lastName, user.password, id],
    }

    return selectRows(await db.query({ query }))
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
