import { Request, Response } from "express";
import { ProfileDto } from "../models/profile.model";
import { getProfileDto } from "../services/profile.service";

/**
 * Edit user profile
 *
 * This request controller assumes there has been auth-checks in place
 * and that there is an user object in the request.
 *
 * @param req
 * @param res
 */
const editUserProfile = async (req: Request, res: Response) => {
  return res.status(500).send("not implemented");
};

// TODO: Add get user profile controller
type GetUserProfileResponse = {
  success: boolean;
  data?: ProfileDto;
  error?: string;
};

/**
 * Get user profile
 *
 * Fetch a profile by the username/profile slug
 *
 * @param req
 * @param res
 */
const getUserProfile = async (
  req: Request,
  res: Response<GetUserProfileResponse>
) => {
  // Get :username param
  const { username } = req.params;

  // Ensure we have username
  if (!username) {
    return res
      .status(500)
      .send({ success: false, error: "Uhoh, you did not pass a username!" });
  }

  // Get profile!
  const profile = await getProfileDto(username);

  // Build result
  const result: GetUserProfileResponse = {
    success: true,
    data: profile,
  };

  // Return
  return res.json(result);
};

// Export
export { editUserProfile, getUserProfile };
