import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { username, email, password, role, address } = req.body

        // Check if the email or username already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })
        if (existingUser) {
            return res.status(400).json({ msg: 'Email or username already exists.' })
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: passwordHash,
            role,
            address,
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: 'User does not exist.' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        const userWithoutPassword = user.toJSON()
        delete userWithoutPassword.password // Exclude password from the response

        res.status(200).json({ token, user: userWithoutPassword })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

