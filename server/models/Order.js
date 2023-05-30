import mongoose from'mongoose'

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true
    },

    manufacturerName: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    transporter: {
        type: String,
        required: true
    }
});

const Order = mongoose.model('Order', orderSchema);

export default Order
// module.exports = Order;
