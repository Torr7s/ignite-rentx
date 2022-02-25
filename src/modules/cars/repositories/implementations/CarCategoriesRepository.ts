import { CarCategoryModel } from '../../models/CarCategoryModel';

import { ICreateCarCategoryDto, ICarCategoriesRepository } from '../CarCategoriesInterface';

class CarCategoriesRepository implements ICarCategoriesRepository{
  private _carCategories: CarCategoryModel[]
  private static _instance: CarCategoriesRepository

  private constructor() {
    this._carCategories = []
  } 

  public static getInstance(): CarCategoriesRepository {
    if (!CarCategoriesRepository._instance) {
      CarCategoriesRepository._instance = new CarCategoriesRepository()
    }

    return CarCategoriesRepository._instance
  }

  create({ name, description }: ICreateCarCategoryDto): void {
    const category = new CarCategoryModel()

    Object.assign(category, {
      name, 
      description, 
      created_at: new Date() 
    })
  
    this._carCategories.push(category)
  }

  list(): CarCategoryModel[] {
    return this._carCategories
  }

  findByName(name: string): CarCategoryModel {
    const category = this._carCategories.find((category) => category.name === name)
    
    return category
  }
}

export { CarCategoriesRepository }