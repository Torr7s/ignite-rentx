import { verify } from 'jsonwebtoken';

import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository';

import { AppError } from '../errors/app.error';

interface IPayload {
  sub: string;
}

async function AuthUserMiddleware(request: Request, response: Response, next: NextFunction) {
  const _usersRepository = new UsersRepository()

  const authHeaderToken = request.headers.authorization

  if (!authHeaderToken) {
    throw new AppError(
      'Invalid token!',
        401
    )
  }

  const [, token] = authHeaderToken.split(' ')

  try {
    const { sub: user_id } = verify(token, process.env.MD5_HASH) as IPayload

    const userData = await _usersRepository.findById(user_id)

    if (!userData) {
      throw new AppError(
        'User does not exists!',
          401
      )
    }

    request.user_id = user_id.toString()

    return next()
  } catch (error) {
    throw new AppError(
      'Invalid token!',
        401
    )
  }
}

export { AuthUserMiddleware }

