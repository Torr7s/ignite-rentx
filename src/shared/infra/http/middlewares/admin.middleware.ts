import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/app.error';

import { UserEntity } from '@modules/users/infra/typeorm/entities/UserEntity';
import { UsersRepository } from '@modules/users/infra/repositories/UsersRepository';

export async function AdminMiddleware(request: Request, response: Response, next: NextFunction): Promise<void> {
  const { user_id } = request

  const usersRepository = new UsersRepository()

  const { admin }: UserEntity = await usersRepository.findById(user_id)

  if (!admin) {
    throw new AppError(
      'User is not an admin!',
        401
    )
  }

  return next()
}