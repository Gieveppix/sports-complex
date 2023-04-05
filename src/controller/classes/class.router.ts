import express from 'express';
import { check } from 'express-validator';
import { createClassController } from '$/src/controller/classes/createClass.controller.js';
import { updateClassController } from './updateClass.controller.js';
import { getAllClassesController } from './getAll.controller.js';
import { getClassByIdController } from './GetById.controller.js';

export const classRoute = express.Router({ mergeParams: true });

classRoute.post(
  '/classes',
  [
    check('name', 'Name must be defined').not().isEmpty(),
    check('description', 'Description must at least 30 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 30 }),
  ],
  createClassController
);

classRoute.get('/classes', getAllClassesController);

classRoute.get('/classes/:id', getClassByIdController);

classRoute.patch(
  '/classes/:id',
  [
    check('name', 'Name must be defined').optional().not().isEmpty(),
    check('description', 'Description must at least 30 characters long')
      .optional()
      .not()
      .isEmpty()
      .isLength({
        min: 30,
      }),
  ],
  updateClassController
);