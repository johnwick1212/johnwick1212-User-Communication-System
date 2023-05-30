import Message from "../models/Message.js"
import Order from '../models/Order.js'

// MANUFACTURER

    export const manufacturer = async (req, res) => {
      try {
    
        const {manufacturerName, to, from, quantity, address, transporter, role } = req.body;
        if(role === "Transporter") {
          res.status(403).json({message: "cannot send data"})
        }
        else {
        // Generate an alphanumeric order ID
        const orderID = generateOrderID();
    
        // Create a new order
        const order = new Order({
          orderID,
          manufacturerName,
          to,
          from,
          quantity,
          address,
          transporter,
        });
    
        // Save the order to the database
        await order.save();
    
        // Send a success response
        res.status(200).json({ message: 'Order created successfully' });
      }
      } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
      }


      function generateOrderID() {
        const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let orderID = '';
        for (let i = 0; i < 5; i++) {
          const randomIndex = Math.floor(Math.random() * alphanumeric.length);
          orderID += alphanumeric.charAt(randomIndex);
        }
        return orderID;
      }

    }


//TRANSPORTER
export const transporter = async(req, res) => {



      try {
        // Extract the form data from the request body
        const { orderID, price, manufacturerUsername, role } = req.body;
        if(role === "Manufacturer") {

        
        const message = new Message({
          orderID,
          price,
          manufacturerUsername
        });
    
        await message.save();
    
        // Send a success response
        res.status(200).json({ message: 'Message sent successfully' });
      }
      } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Internal server error' });
      }


}
