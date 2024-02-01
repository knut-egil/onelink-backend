import User from "./../models/user.model";
import Profile, { ProfileDto } from "./../models/profile.model";

/** */
const getProfileDto = async (username: string): Promise<ProfileDto> => {
  // We have to find a creator by their username!
  const creator = await User.findOne({ username: username });

  // Assume we found them!

  // Find a profile by the creators' id!
  const profile = await Profile.findOne({ creator: creator._id });

  // Assume we found it!

  // Build DTO result
  const result: ProfileDto = {
    id: profile.id,
    profileImage: "", // To be added later, when we have profile pics etc.
    creator: undefined, // We want to keep this somewhat private :)
    title: profile.title,
    bio: profile.bio,
    extras: profile.extras,
    links: profile.links,
  };

  // Return
  return result;
};

export { getProfileDto };
