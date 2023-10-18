import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: false, trim: true },
    lastName: { type: String, required: false, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    isMobileVerified: { type: Boolean, default: false, required: false },
    isActive: { type: Boolean, default: false, required: false },
  }, { timestamps: true })

  const User = mongoose.model('users', UserSchema);

  export default User;
