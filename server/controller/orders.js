import Order from '../models/Order.js' // Assuming you have imported the Order model

export const getOrders = async (req, res) => {
    const {username} = req.params
    try {
        // Retrieve all messages sent to the transporter's username from the Order schema
        const messages = await Order.find({ transporter: username })

        // Send the list of messages in the response
        res.status(200).json({ messages })
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error retrieving transporter messages:', error)
        res.status(500).json({ error: 'Internal server error' })
    }
}
