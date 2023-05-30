import  express  from "express"
import {getResponse} from "../controller/response.js"

import {verifyToken} from "../middleware/auth.js"

const router = express.Router()

// READ

router.get("/:username", verifyToken, getResponse)

export default router