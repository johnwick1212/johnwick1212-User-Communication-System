import Message from '../models/Message.js' // Assuming you have imported the Message model

export const getResponse = async (req, res) => {
    
    const {username} = req.params
    try {
        // Retrieve all messages from the Message schema for the manufacturer's username
        const messages = await Message.find({ manufacturerUsername: username })
        console.log(messages)
        // Send the list of messages (transporter responses) in the response
        res.status(200).json({ messages })
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error retrieving transporter responses:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
