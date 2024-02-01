// Import
import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Create DTO type
type UserDto = {
  id: string;
  username: string;
  email: string;

  created_at: number;
  updated_at: number;
};

// Server-sided more specific model typing
// Naming can be improved
type UserModelDto = UserDto & {
  password: string;
};

// User instance methods
interface IUserMethods {
  checkPassword(): Promise<boolean>;
}

// Create model type!
type UserModel = mongoose.Model<UserModelDto, {}, IUserMethods>;

// Create model
const userSchema = new mongoose.Schema<UserModelDto, UserModel, IUserMethods>({
  /**
   * Username
   *
   * Limit usernames using regex, only alphanumeric & ./-/-
   * ensure a length between 1 to 32 chars.
   *
   * We should also have some reserved words like "register", "login" etc.
   * to not interfer anything like our api or other endpoints
   */
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: /[0-z._-]{1,32}/g,
  },
  /**
   * Email
   *
   * We have some strict, and a bit crude email filter in place for now.
   * We also most likely want to do email verification so it shouldn't be a big deal really.
   *
   * Modified pattern from, allowing for a bit longer TLDs; we do not allow for plus symbols etc. here.
   * Source: https://stackoverflow.com/a/24214767/15007496
   */
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/g,
  },

  /**
   * Password (hash)
   */
  password: {
    type: String,
    required: true, // This is of course required!
    minlength: 6, // Just because the example I'm looking at used it :skull:
    trim: true, // Not really sure why we would need to do this tbh., again, example told us to
  },

  /**
   * Created at timestamp
   */
  created_at: {
    type: Number,
    default: Date.now,
  },

  /**
   * Updated at timestamp
   */
  updated_at: {
    type: Number,
    default: Date.now,
  },
});

// Add functions!
userSchema.method(
  "checkPassword",
  async function checkPassword(password: string): Promise<boolean> {
    // User instance
    const user = this;

    // Variable to store the compare result
    let isCorrect = false;
    try {
      // Compare input password against stored password hash
      isCorrect = await bcrypt.compare(password, user.password);
    } catch (err) {
      // Some error occured!
      console.error(
        `[${new Date().toISOString()}] Onelink Backend @ An error occured while checking user #${
          user.id
        }'s password!`
      );
    }

    // Return result
    return isCorrect;
  }
);

// Pre-save hook
userSchema.pre("save", async function (next) {
  // User instance
  const user = this;

  // Check if pasword is modified
  if (user.isModified("password")) {
    // We want to store the hashed password, not the actual password!
    user.password = await bcrypt.hash(user.password, 12);
  }

  // Update "updated_at" timestamp!
  user.updated_at = Date.now();

  // Continue
  next();
});

// Create model!
const User = mongoose.model<UserModelDto, UserModel>("User", userSchema);

// Export model!
export default User;
