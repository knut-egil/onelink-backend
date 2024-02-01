import mongoose from "mongoose";

type ProfileLinkDto = {
  id: string;
  url: string;
  title: string;
  icon: string;
};

type ProfileDto = {
  id: string;
  profileImage: string;
  title: string;
  bio: string;
  extras: string[];
  links: ProfileLinkDto[];
};

// Create profile schema
const profileSchema = new mongoose.Schema<ProfileDto>({
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
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "ProfileLinks",
      },
    ],
    validate: [arrayLimit(5), `{PATH} exceeds the maxlimit of 5`],
  },
});

function arrayLimit(limit: number): (arr: any[]) => boolean {
  return (arr) => arr.length <= limit;
}
