import User from "../models/User.js"

export const getUserData = async (req, res) => {
    const {email} = req.params
    try {
        // Find the user based on the email
        // console.log("now we are here")
        const user = await User.findOne({ email })
        // console.log(user)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        // Return the user data as a JSON response
        return res.status(200).json(user)
    } catch (error) {
        // Handle any errors that occurred during the query
        res.status(500).json({ message: 'Server error' })
    }
}