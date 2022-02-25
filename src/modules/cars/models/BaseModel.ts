import { v4 as uuid } from 'uuid';

class BaseModel {
  id?: string
  created_at: Date

  constructor() {
    this.id ? this.id : uuid()
  }
}

export { BaseModel }