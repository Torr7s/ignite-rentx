import { app } from '@shared/infra/http/app';

import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm';

import request, { Response } from 'supertest';

let connection: Connection

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuid()
    const password = await hash('adminpassword', 9)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, admin, created_at) 
      VALUES ('${id}', 'useradmin', 'admin@rentx.com.br', '${password}', 'XXXXXXX', true, 'now()')`
    )
  })

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/api/login').send({
      email: 'admin@rentx.com.br',
      password: 'adminpassword'
    })

    const { body: { token } } = responseToken

    const response: Response = await request(app)
      .post('/api/categories')
      .send({
        name: 'Test category',
        description: 'Teste category desc'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(201)
  })

  it('should not be able to create a new category when name already exists', async () => {
    const responseToken = await request(app).post('/api/login').send({
      email: 'admin@rentx.com.br',
      password: 'adminpassword'
    })

    const { body: { token } } = responseToken

    const response: Response = await request(app)
      .post('/api/categories')
      .send({
        name: 'Test category',
        description: 'Teste category desc'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(400)
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })
})