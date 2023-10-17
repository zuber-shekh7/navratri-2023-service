import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: String,
    isMobileVerified: Boolean,
    isActive: Boolean,
    createdAt: Date,
    updatedAt: Date,
  })

  const User = mongoose.model('users', userSchema);

  export default User;
