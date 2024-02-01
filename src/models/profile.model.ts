import mongoose from "mongoose";
import User, { UserModel, UserSchema } from "./user.model";

type ProfileLinkDto = {
  id: string;
  url: string;
  title: string;
  icon: string;
};

type ProfileDto = {
  creator: mongoose.Schema.Types.ObjectId;
  id?: string;
  profileImage: string;
  title: string;
  bio: string;
  extras: string[];
  links: ProfileLinkDto[];
};

// Profile instance methods
interface IProfileMethods {
  getCreator(): Promise<typeof User>;
}

// Create model type!
type ProfileModel = mongoose.Model<ProfileDto, {}, IProfileMethods>;

// Create profile-link schema
const profileLinkSchema = new mongoose.Schema<ProfileLinkDto>({
  /**
   * Link url
   */
  url: {
    type: String,
    maxlength: 256,
    required: true,
  },

  /**
   * Link title
   */
  title: {
    type: String,
    maxlength: 64,
    required: true,
    // Add default as domain of url? That would be neat
  },

  /**
   * Link icon
   */
  icon: {
    type: String,
    maxlength: 32,
    required: false,
    default: "",
  },
});

// Create profile schema
const profileSchema = new mongoose.Schema<
  ProfileDto,
  ProfileModel,
  IProfileMethods
>({
  /**
   * Profile owner
   */
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    unique: true,
    required: true,
    index: true, // We'll probably look up profiles from their creators' username etc.
  },

  /**
   * Profile picture url
   */
  profileImage: {
    type: String,
    maxlength: 256,
    required: false,
  },

  /**
   * Title text
   */
  title: {
    type: String,
    maxlength: 32,
    required: false,
  },

  /**
   * Bio text
   */
  bio: {
    type: String,
    maxlength: 256,
    required: false,
  },

  /**
   * Extra text
   * We'll support a max of 3 probably,
   * small extra deatils like job title, country, nickname?
   */
  extras: {
    type: [String],
    maxlength: 32,
    validate: [arrayLimit(3), `{PATH} exceeds the maxlimit of 3`],
  },

  /**
   * Profile link/buttons
   */
  links: {
    type: [profileLinkSchema],
    validate: [arrayLimit(5), `{PATH} exceeds the maxlimit of 5`],
  },
});

function arrayLimit(limit: number): (arr: any[]) => boolean {
  return (arr) => arr.length <= limit;
}

// Profile instance methods
profileSchema.method(
  "getCreator",
  async function getCreator(): Promise<UserModel> {
    const profile = await Profile.populate<UserModel>(this, "creator");
    try {
      const creator = profile;

      return creator;
    } catch (err) {
      const { stack, message } = err as Error;
      console.error(
        `[${new Date().toISOString()}] Onelink Backend @ Failed 'getCreator' for profile #${
          profile.id
        }! Error: ${stack ?? message}`
      );
    }
  }
);

// Create profile model
const Profile = mongoose.model<ProfileDto>("Profile", profileSchema);

// Export
export default Profile;
export { ProfileDto, ProfileLinkDto, profileSchema, ProfileModel };
