import { Request, Response } from "express";
import User, { UserDto } from "./../models/user.model";

// TODO: Create register request handler
type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};
type RegisterResponse = {
  success: boolean;
  data?: UserDto;
  error?: string;
};

/**
 * Register user controller
 *
 * @param req
 * @param res
 */
const register = async (
  req: Request<RegisterPayload>,
  res: Response<RegisterResponse>
) => {
  // Extract and validate payload!
  const payload = req.body as RegisterPayload;

  // Surely there are better ways of doing this
  const validation = {
    username: {
      minLength: 1,
      maxLength: 32,
    },
  };

  // Will contain any failed validation messages!
  let validationMessage: string;

  // Validate fields
  // Get username length
  const usernameLength = (payload.username ?? "").length;
  // Check username is shorter than our min length!
  if (usernameLength < validation.username.minLength)
    validationMessage = `Username too short, should be >=${validation.username.minLength}`;
  // Check username is longer than our max length!
  else if (usernameLength > validation.username.maxLength)
    validationMessage = `Username too long, should be <=${validation.username.maxLength}`;
  // Check if emails are valid...

  // Validation is boring, I'll get back to this later

  // Check if we have any validation failed messages
  if (validationMessage) {
    // Send a response with the error(s), one at a time for now
    return res.status(500).json({
      success: false,
      error: validationMessage,
    });
  }

  // Extract fields
  const { username, email, password, confirmPassword } = payload;

  // Validation successful!
  // Create user document...
  const user = await User.create({
    username,
    email,
    password,
  });

  // Return user document as UserDto!
  return res.json({
    success: true,
    data: user as UserDto,
  });
};

// ---

// TODO: Create login request handler
type LoginPayload = {
  email: string;
  password: string;
};
type LoginResponse = {
  success: boolean;
  data?: UserDto;
  error?: string;
};

/**
 * Login user controller
 *
 * @param req
 * @param res
 */
const login = async (
  req: Request<LoginPayload>,
  res: Response<LoginResponse>
) => {
  // Extract and validate payload!
  const payload = req.body as LoginPayload;

  // Surely there are better ways of doing this
  const validation = {
    email: {},
  };

  // Will contain any failed validation messages!
  let validationMessage: string;

  // Validate fields
  // Check if emails are valid...

  // Validation is boring, I'll get back to this later

  // Check if we have any validation failed messages
  if (validationMessage) {
    // Send a response with the error(s), one at a time for now
    return res.status(500).json({
      success: false,
      error: validationMessage,
    });
  }

  // Extract fields
  const { email, password } = payload;

  // Validation successful!
  // Find document by email
  const user = await User.findOne({ email: email });

  // Check if we're missing a user or the user's password doesn't match!
  if (!user || !(await user.checkPassword(password)))
    // No user / password check failed.
    return res.status(401).json({
      success: false,
      error: "You have entered an invalid email or password",
    });

  // Login successful!
  // Return user document as UserDto!
  return res.json({
    success: true,
    data: user as UserDto,
  });
};

// Export
export { register, login };
