import { Request, Response } from 'express';

import { ImportCarCategoryUseCase } from './ImportCarCategoryUseCase';

class ImportCarCategoryController {
  constructor(
    private _importCarCategoryUseCase: ImportCarCategoryUseCase
  ) { }

  handle(request: Request, response: Response): Response {
    const { file } = request
    
    this._importCarCategoryUseCase.perform(file)

    return response.send()
  }
}

export { ImportCarCategoryController }