import  express  from "express"
import {getUserData} from "../controller/userData.js"

import {verifyToken} from "../middleware/auth.js"

const router = express.Router()

// READ

router.get("/user/:email", verifyToken, getUserData)

export default router