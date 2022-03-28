import { app } from '@shared/infra/http/app';

import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

import request, { Response } from 'supertest';

let connection: Connection

describe('List categories', () => {
  beforeAll(async () => {
    connection = await createConnection()

    await connection.runMigrations()

    const id = uuid()
    const password = await hash('adminpassword', 9)

    await connection.query(
      `INSERT INTO USERS(
        id, name, email, password, driver_license, admin, created_at      
      ) 
      VALUES (
        '${id}', 'useradmin', 'admin@rentx.com.br', '${password}', 'XXXXXXX', true, 'now()'
      )`
    )
  })

  it('should be able to list all categories', async () => {
    const responseToken = await request(app)
      .post('/api/login')
      .send({
        email: 'admin@rentx.com.br',
        password: 'adminpassword'
      })

    const { token } = responseToken.body

    await request(app)
      .post('/api/categories')
      .send({
        name: 'Test category',
        description: 'Test category desc'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const response: Response = await request(app).get('/api/categories')

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
})