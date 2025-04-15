import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import createTokenAndSaveCookie from '../jwt/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hashing the passwrord
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res)
            res.status(201).json({
                message: "User registered successfully", user: {
                    name: newUser.name,
                    email: newUser.email,
                    _id: newUser._id
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            return res.status(404).json({ message: "Invalid User or Incorrect Password" });
        }
        createTokenAndSaveCookie(user._id, res);
        res.status(201).json({
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                _id: user._id
            },
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.User._id
        const filteredUsers = await User.find({ _id: {$ne: loggedInUser }}).select("-password")
        res.status(201).json({ filteredUsers });
    } catch (error) {
        console.log("Error in allUsers Controller: " + error);
        res.status(500).json({ message: "Server error" });
    }
};