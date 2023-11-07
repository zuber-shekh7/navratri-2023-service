import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: false,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
      required: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
      required: false,
    },
    isVolunteer: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const hashedPassword = await bcryptjs.hashSync(this.password, 10);
    this.password = hashedPassword;

    return next();
  } catch (err) {
    return next(err);
  }
});

AdminSchema.methods.authenticate = async function (password) {
  try {
    return await bcryptjs.compareSync(password, this.password);
  } catch (err) {
    return false;
  }
};

const Admin = mongoose.model("admins", AdminSchema);

export default Admin;
