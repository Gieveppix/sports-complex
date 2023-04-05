import { Request, Response } from 'express';
import { validationResult, ValidationError } from 'express-validator';
import { createAppointment } from './appointment.dao.js';

export async function createAppointmentController(
  request: Request,
  response: Response
): Promise<void> {
  const res = await createAppointment(request.body);

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    response.status(422).send(errors.errors[0].msg as ValidationError);
  } else if (!res || res.response === undefined) {
    response.status(res.responseCode).json(res.message);
  } else {
    response
      .status(res.response.responseCode)
      .json({ data: res.user, message: res.response.message });
  }
}
