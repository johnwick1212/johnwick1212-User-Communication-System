import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    orderID: { type: String, required: true },
    price: { type: Number, required: true },
    manufacturerUsername: {
        type: String,
        required: true,
      },
})

const Message = mongoose.model('Message', MessageSchema)

export default Message
