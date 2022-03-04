import 'reflect-metadata';
import 'express-async-errors';

import './database';
import './shared/container';

import { app } from './app';

app.listen(3333, () => {
  console.log(
    'Server is running successfully!'
  )
})