import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";
import { BadRequestError } from "../errors/bad-request-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../models/user";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 - 20 char"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      throw new BadRequestError("Email in use");
    }
    user = User.build({ email, password, username });
    await user.save();

    const userJwt = jwt.sign(
      { id: user.id, email, username },
      process.env.JWT_KEY!
    );
    req.session = { jwt: userJwt };
    res.status(201).send(user);
  }
);
export { router as signupRouter };
