import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import { AuthUserMiddleware } from '@shared/infra/http/middlewares/auth-user.middleware';
import { AdminMiddleware } from '@shared/infra/http/middlewares/admin.middleware';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

const carRouter = Router()

const uploadCarImages = multer(uploadConfig.upload('./tmp/car_images'))

const CreateCarHandler              = new CreateCarController().handle
const CreateCarSpecificationHandler = new CreateCarSpecificationController().handle
const ListAvailableCarsHandler      = new ListAvailableCarsController().handle
const UploadCarImagesHander         = new UploadCarImagesController().handle

carRouter.post(
  '/', 
  AuthUserMiddleware, 
  AdminMiddleware, 
  CreateCarHandler
)

carRouter.post(
  '/specifications/:id',
  AuthUserMiddleware,
  AdminMiddleware,
  CreateCarSpecificationHandler
)

carRouter.get('/available', ListAvailableCarsHandler)

carRouter.post(
  '/images/:id',
  AuthUserMiddleware,
  AdminMiddleware,
  uploadCarImages.array('images'),
  UploadCarImagesHander 
)

export { carRouter }