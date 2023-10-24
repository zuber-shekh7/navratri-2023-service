import jwt from 'jsonwebtoken';
import User from '../models/user.js'

const secretKey = 'your-secret-key'
const staticOtp = 123456


export const sendOtpToUser = async (mobileNumber) => {
  try {

    let user = await User.findOne({ mobile: mobileNumber })
    if (!user) {
      //if the user mobile doesn't exist, create an entry in the database.
      user = await user.create({ mobile: mobileNumber })
    }

  } catch (error) {
    console.error('sendOtpToUser Error:', error)
    return { success: false, message: 'Failed to send otp', status: 500 }
  }

  return { success: true, message: 'OTP successfully send', status: 200 }
}

export const verifyUserOtp = async (mobileNumber, otp) => {

  try {

    const user = await User.findOne({ mobile: mobileNumber })
    if (!user || otp != staticOtp) {
      return { success: false, message: 'OTP verification failed', status: 401, token: null, user: null }
    }

    const token = jwt.sign({ mobileNumber }, secretKey, { expiresIn: '24h' })

    return { success: true, message: 'OTP verification successfully', status: 200, token, user }

  } catch (error) {
    console.log(error)
    return { success: false, message: 'OTP verification failed', status: 500, token: null, user: null }
  }

}

export const fetchCustomer = async (customerId) => {

  try {

    const customer = await User.findById(customerId)

    if (!customer) {
      return { success: true, message: 'Customer not found', status: 404 }
    }

    return { success: true, message: 'Customer found', status: 200, customer }

  } catch (error) {
    console.log(error)
    return { success: true, message: 'Customer get failed', status: 500 }
  }

}
