import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import logger from "../utils/logger.js"

const registerUser = asyncHandler(async (req, res) => {

    const { email, phoneNumber, password } = req.body

    if ([email, phoneNumber, password].some((field) => field?.trim === "")) {
        logger.warn("Missing required fields")
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
        logger.warn("User already exists. Please Login")
        throw new ApiError(400, "User already exists with this email")
    }

    const user = await User.create({
        email,
        phoneNumber,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        logger.error("Cannot register User")
        throw new ApiError(500, "Something went wrong while registering user")
    }

    return res.status(201).json(new ApiResponse(201, createdUser, "User registered successfully"))
})

export {
    registerUser
}