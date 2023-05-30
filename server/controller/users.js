import User from "../models/User.js"

export const getTransporterUsernames = async (req, res) => {
    try {
        // Retrieve transporter usernames from the database
        const transporters = await User.find({ role: 'Transporter' }, 'username')
        const usernames = transporters.map((transporter) => transporter.username)
        // console.log("usernames are: ",usernames)
        // Send the list of transporter usernames in the response
        res.status(200).json({ usernames })
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error retrieving transporter usernames:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}