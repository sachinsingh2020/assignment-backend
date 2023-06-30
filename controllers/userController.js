import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import { User } from "../models/userModel.js";


export const createUser = catchAsyncError(async (req, res, next) => {
    const { name, email, phone, website } = req.body;


    if (!name || !email || !phone || !website) {
        return next(new ErrorHandler('Please fill all the fields', 400))
    }

    const mail = await User.findOne({ email: email });

    if (mail) {
        return next(new ErrorHandler('User already exists', 400))
    }


    const user = await User.create({
        name: name,
        email: email,
        phone: phone,
        website: website,
    })
    // console.log(user);
    // console.log(name, email, phone, website);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
    })
});

export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
        success: true,
        message: "All users fetched successfully",
        users,
    })
});

export const updateUser = catchAsyncError(async (req, res, next) => {
    const { id, name, email, phone, website } = req.body;

    // console.log(id, name, email, phone, website);

    const user = await User.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        website,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user,
    })

});

export const changeLike = catchAsyncError(async (req, res, next) => {
    const { id } = req.body;

    const user = await User.findById(id);

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    user.liked = !user.liked;

    await user.save();

    res.status(200).json({
        success: true,
    })
});


export const deleteUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.body;
    // console.log(id);
    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return next(new ErrorHandler('User not found', 404))
    }

    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    })
});