import User from '../models/user.model.js';

export const signup = (req, res) => {
    try {
        const { name, email, password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }
        const user = User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const newUser = new User({
            name,
            email,
            password,
        });
        newUser.save().then(() => res.status.json({ message: "User registered successfully" }))
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
    }
}   