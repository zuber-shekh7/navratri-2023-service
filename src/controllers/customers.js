import { sendOtpToUser, verifyUserOtp, fetchCustomer } from '../services/customers.js'


export const sendOtp = async (req, res) => {

    const { mobileNumber } = req.body //validate mobileNumber (Use express validator)
    const result = await sendOtpToUser(mobileNumber);

    return res.status(result.status).json({
        data: {
            message: result.message
        },
        status: result.status
    });
}

export const verifyOtp = async (req, res) => {

    const { mobileNumber, otp } = req.body
    const result = await verifyUserOtp(mobileNumber, otp); //validate both fields

    return res.status(result.status).json({
        data: {
            message: result.message,
            token: result.token,
            user: result.user //need to get specific fields of the user
        },
        status: result.status
    });
}

export const getCustomer = async (req, res) => {

    const customerId = req.params.id1
    const result = await fetchCustomer(customerId)

    return res.status(result.status).json({
        data: {
            message: result.message,
            user: result.customer //need to get specific fields of the user
        },
        status: result.status
    });
}
