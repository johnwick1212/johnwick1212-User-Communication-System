import User from "../models/User.js"

export const getRole = async (req, res) => {
    const { username } = req.params
    const role = await User.findOne({ username })
    try{
      if (role) {
        // If role exists, send it as the response
        res.status(200).json({ role })
      }
    }
    catch(error)
     {
        // If role does not exist, send an appropriate error response
        res.status(404).json({ error: 'Role not found' })
      }
}