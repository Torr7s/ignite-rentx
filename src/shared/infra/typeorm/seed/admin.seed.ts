import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Connection } from 'typeorm';

import createConnection from '../index'

create()
  .then(() => console.log('Admin user created.'))
  .catch(() => { })

async function create(): Promise<void> {
  const id = uuid()
  const password = await hash('useradminpassword', 9)

  const connection: Connection = await createConnection('localhost')

  await connection.query(
    `INSERT INTO USERS(
      id, name, email, password, driver_license, admin, created_at      
    ) 
    VALUES (
      '${id}', 'admin', 'admin@rentx.com.br', '${password}', 'XXXXXXX', true, 'now()'
    )`
  )

  await connection.close()
}