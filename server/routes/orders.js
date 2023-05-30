import  express  from "express"
import {getOrders} from "../controller/orders.js"

import {verifyToken} from "../middleware/auth.js"

const router = express.Router()

// READ

router.get("/:username", verifyToken, getOrders)

export default router