import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import bodyParser from "body-parser"
import Order from "./models/Order.js"
import messageRoute from "./routes/message.js"
import userRoutes from "./routes/users.js"
import orderRoutes from "./routes/orders.js"
import messageResponseRoutes from "./routes/response.js"
import getData from "./routes/userData.js"

dotenv.config()


// Create Express app
const app = express()


// Middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))


//ROUTES FOR LOGIN AND REGISTER
app.use("/auth", authRoutes)
app.use("/auth/message", messageRoute)
app.use("/users", userRoutes)
app.use("/orders", orderRoutes)
app.use("/response", messageResponseRoutes)
app.use("/api", getData)


// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error)
    })

  // SHOULD BE DONE TO SAVE NEW ORDER DATA  
    // const data = new Order({
    //     name: "Order 3"
    // })
    // data.save()




// Define routes
// app.use('/api/auth', require('./routes/auth')) // User registration and authentication routes
// app.use('/api/messages', require('./routes/messages')) // Message handling routes

// Start the server
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})